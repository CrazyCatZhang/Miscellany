"use strict";
class VDom {
    createElement(el) {
        return document.createElement(el);
    }
    setText(el, text) {
        el.textContent = text;
    }
    render(data) {
        const root = this.createElement(data.tag);
        if (data.text) {
            this.setText(root, data.text);
        }
        if (data.children && Array.isArray(data.children)) {
            data.children.forEach((child) => {
                const childNode = this.render(child);
                root.appendChild(childNode);
            });
        }
        return root;
    }
}
class Vue extends VDom {
    constructor(options) {
        super();
        this.options = options;
        this.init();
    }
    init() {
        const data = {
            tag: "div",
            text: "Hello, World!",
            children: [
                {
                    tag: "p",
                    text: "This is a paragraph.",
                },
                {
                    tag: "ul",
                    children: [
                        {
                            tag: "li",
                            text: "List item 1",
                        },
                        {
                            tag: "li",
                            text: "List item 2",
                        },
                    ],
                },
            ],
        };
        const app = typeof this.options.el === "string"
            ? document.querySelector(this.options.el)
            : this.options.el;
        if (app) {
            app.appendChild(this.render(data));
        }
    }
}
new Vue({
    el: "#app",
});
