const fetch = require("node-fetch");
module.exports = {
    async timeline(req, res) {
        const data = await fetch("https://storage.googleapis.com/dito-questions/events.json");
        const json = await data.json();
        const timeline = createTimeline(json);
        return res.send({ timeline });
    }
};
function createTimeline(json) {
    let { events } = json;
    let products = [];
    let timeline = [];
    for (const event of events) {
        if (event.event == "comprou-produto") {
            let product = findProduct(event);
            products.push(product);
        } else if (event.event == "comprou") {
            let timelineItem = findTimelineItem(event);
            timeline.push(timelineItem);
        }
    }

    timeline.forEach(it => {
        it.products = products.filter(p => {
            return p.transaction_id == it.transaction_id;
        }).map(({ name, price }) => ({ name, price }));
    });

    return timeline.reverse((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}
function findTimelineItem(event) {
    let timelineItem = {};
    timelineItem.timestamp = event.timestamp;
    timelineItem.revenue = event.revenue;
    event.custom_data.forEach(e => {
        if (e.key == "transaction_id") {
            timelineItem.transaction_id = e.value;
        }
        else if (e.key == "store_name") {
            timelineItem.store_name = e.value;
        }
    });
    return timelineItem;
}
function findProduct(event) {
    let product = {};
    event.custom_data.forEach(e => {
        if (e.key == "transaction_id") {
            product.transaction_id = e.value;
        }
        else if (e.key == "product_name") {
            product.name = e.value;
        }
        else if (e.key == "product_price") {
            product.price = e.value;
        }
    });
    return product;
}