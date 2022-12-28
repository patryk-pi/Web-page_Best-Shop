function Calculator (form, summary) {

    this.prices = {
        products: 1,
        orders: 2,
        package: {
            basic: 0,
            professional: 25,
            premium: 60
        },
        accounting: 35,
        terminal: 5
    }

    this.form = {
        products: form.querySelector("#products"),
        orders: form.querySelector("#orders"),
        package: form.querySelector("#package"),
        accounting: form.querySelector("#accounting"),
        terminal: form.querySelector("#terminal")
    };

    this.summary = {
        list: summary.querySelector("ul"),
        items: summary.querySelector("ul").children,
        total: {
            container: summary.querySelector("#total-price"),
            price: summary.querySelector(".total__price")
        }
    };
}

Calculator.prototype.inputEvent = function (event) {
    const id = event.currentTarget.id;
    const value = event.currentTarget.value;

    const singlePrice = this.prices[id];
    const totalPrice = value * singlePrice;

    this.updateSummary(id, value + " * $" + singlePrice, totalPrice, function (item, calc, total) {
        if (value < 0) {
            calc.innerHTML = null;
            total.innerText = "Value should be greater than 0";
        }

        if (value.length === 0) {
            item.classList.remove("open");
        }
    });
};

Calculator.prototype.updateSummary = function (id, calc, total, callback) {
    const summary = this.summary.list.querySelector("[data-id=" + id + "]");
    const summaryCalc = summary.querySelector(".item__calc");
    const summaryTotal = summary.querySelector(".item__price");

    summary.classList.add("open");
    if (summaryCalc !== null) {
        summaryCalc.innerText = calc;
    }

    summaryTotal.innerText = "$" + total;

    if (typeof callback === "function") {
        callback(summary, summaryCalc, summaryTotal);
    }
};