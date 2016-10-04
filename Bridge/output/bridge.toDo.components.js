Bridge.assembly("Bridge.ToDo", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.ToDo.Components.ButtonCheckAll", {
        clicked: null,
        _checkAll: false,
        _thisButton: null,
        ctor: function (selector) {
            this.$initialize();
            this._thisButton = $(selector);
            this._thisButton.click(Bridge.fn.bind(this, $_.Bridge.ToDo.Components.ButtonCheckAll.f1));
        },
        setCheckAll: function (value) {
            this._checkAll = value;
            this.changeIcon();
        },
        changeIcon: function () {
            if (this._checkAll) {
                //change icon
                this._thisButton.removeClass("glyphicon-chevron-down");
                this._thisButton.addClass("glyphicon-ok");
            } else {
                this._thisButton.removeClass("glyphicon-ok");
                this._thisButton.addClass("glyphicon-chevron-down");
            }
        }
    });

    var $_ = {};

    Bridge.ns("Bridge.ToDo.Components.ButtonCheckAll", $_);

    Bridge.apply($_.Bridge.ToDo.Components.ButtonCheckAll, {
        f1: function () {
            this._checkAll = !this._checkAll;
            this.changeIcon();
            !Bridge.staticEquals(this.clicked, null) ? this.clicked(this._checkAll) : null;
        }
    });

    Bridge.define("Bridge.ToDo.Components.ButtonClearCompleted", {
        onClick: null,
        btnClearCompleted: null,
        ctor: function (selector) {
            this.$initialize();
            this.btnClearCompleted = Bridge.cast(document.getElementById(selector), HTMLInputElement);
            this.btnClearCompleted.onclick = Bridge.fn.combine(this.btnClearCompleted.onclick, Bridge.fn.bind(this, $_.Bridge.ToDo.Components.ButtonClearCompleted.f1));
        },
        show: function () {
            this.btnClearCompleted.classList.remove("hidden");
        },
        hide: function () {
            this.btnClearCompleted.classList.add("hidden");
        }
    });

    Bridge.ns("Bridge.ToDo.Components.ButtonClearCompleted", $_);

    Bridge.apply($_.Bridge.ToDo.Components.ButtonClearCompleted, {
        f1: function () {
            !Bridge.staticEquals(this.onClick, null) ? this.onClick() : null;
        }
    });

    Bridge.define("Bridge.ToDo.Components.Footer", {
        _footer: null,
        ctor: function (selector) {
            this.$initialize();
            this._footer = Bridge.cast(document.getElementById("footer"), HTMLDivElement);
        },
        show: function () {
            this._footer.removeAttribute("hidden");
        },
        hide: function () {
            this._footer.setAttribute("hidden", "hidden");
        }
    });

    Bridge.define("Bridge.ToDo.Components.InputToDoItem", {
        onKeyDownEnter: null,
        _thisInput: null,
        ctor: function (selector) {
            this.$initialize();
            this._thisInput = $(selector);

            this._thisInput.keyup(Bridge.fn.bind(this, $_.Bridge.ToDo.Components.InputToDoItem.f1));
        },
        getVal: function () {
            return this._thisInput.val();
        },
        setVal: function (value) {
            this._thisInput.val(value);
        }
    });

    Bridge.ns("Bridge.ToDo.Components.InputToDoItem", $_);

    Bridge.apply($_.Bridge.ToDo.Components.InputToDoItem, {
        f1: function (key) {
            if (key.keyCode === 13) {
                !Bridge.staticEquals(this.onKeyDownEnter, null) ? this.onKeyDownEnter() : null;
            }
        }
    });

    Bridge.define("Bridge.ToDo.Components.RadioButtonQueryItems", {
        rbShowAll: null,
        rbShowActive: null,
        rbShowCompleted: null,
        click: null,
        selected: 0,
        ctor: function (selectorShowAll, selectorShowActive, selectorShowCompleted) {
            this.$initialize();
            this.selected = Bridge.ToDo.Components.RadioButtonQueryItems.ShowOptions.All;
            this.rbShowAll = Bridge.cast(document.getElementById(selectorShowAll), HTMLLabelElement);
            this.rbShowActive = Bridge.cast(document.getElementById(selectorShowActive), HTMLLabelElement);
            this.rbShowCompleted = Bridge.cast(document.getElementById(selectorShowCompleted), HTMLLabelElement);

            this.rbShowAll.onclick = Bridge.fn.combine(this.rbShowAll.onclick, Bridge.fn.bind(this, $_.Bridge.ToDo.Components.RadioButtonQueryItems.f1));

            this.rbShowActive.onclick = Bridge.fn.combine(this.rbShowActive.onclick, Bridge.fn.bind(this, $_.Bridge.ToDo.Components.RadioButtonQueryItems.f2));

            this.rbShowCompleted.onclick = Bridge.fn.combine(this.rbShowCompleted.onclick, Bridge.fn.bind(this, $_.Bridge.ToDo.Components.RadioButtonQueryItems.f3));

        }
    });

    Bridge.ns("Bridge.ToDo.Components.RadioButtonQueryItems", $_);

    Bridge.apply($_.Bridge.ToDo.Components.RadioButtonQueryItems, {
        f1: function () {
            this.selected = Bridge.ToDo.Components.RadioButtonQueryItems.ShowOptions.All;
            !Bridge.staticEquals(this.click, null) ? this.click(this.selected) : null;
        },
        f2: function () {
            this.selected = Bridge.ToDo.Components.RadioButtonQueryItems.ShowOptions.Active;
            !Bridge.staticEquals(this.click, null) ? this.click(this.selected) : null;
        },
        f3: function () {
            this.selected = Bridge.ToDo.Components.RadioButtonQueryItems.ShowOptions.Completed;
            !Bridge.staticEquals(this.click, null) ? this.click(this.selected) : null;
        }
    });

    Bridge.define("Bridge.ToDo.Components.RadioButtonQueryItems.ShowOptions", {
        $kind: "enum",
        statics: {
            All: 0,
            Active: 1,
            Completed: 2
        }
    });

    Bridge.define("Bridge.ToDo.Components.ToDoItem", {
        deleteClicked: null,
        completeClicked: null,
        _complete: false,
        _label: "",
        _cbItem: null,
        _pLabel: null,
        _buttonDel: null,
        _divMainItem: null,
        config: {
            init: function () {
                this._id = new System.Guid();
            }
        },
        ctor: function (label) {
            this.$initialize();
            this._id = System.Guid.newGuid();
            this._label = label;
            this.initComponents(this._label);
        },
        getLabel: function () {
            return this._label;
        },
        getDivItem: function () {
            return this._divMainItem;
        },
        getItemID: function () {
            return this._id.toString();
        },
        getComplete: function () {
            return this._complete;
        },
        setComplete: function (value) {
            this._complete = value;
            this._cbItem.checked = this._complete;
        },
        initComponents: function (label) {
            this.initCheckboxItem();
            this.initLabel(label);
            this.initButtonDel();
            this._divMainItem = this.createHTMLItem();
        },
        initCheckboxItem: function () {
            this._cbItem = Bridge.merge(document.createElement('input'), {
                type: "checkbox"
            } );
            this._cbItem.onclick = Bridge.fn.combine(this._cbItem.onclick, Bridge.fn.bind(this, $_.Bridge.ToDo.Components.ToDoItem.f1));
        },
        initLabel: function (label) {
            this._pLabel = Bridge.merge(document.createElement('p'), {
                className: "text-left",
                innerHTML: label
            } );
        },
        initButtonDel: function () {
            this._buttonDel = Bridge.merge(document.createElement('span'), {
                className: "glyphicon glyphicon-remove-sign text-right"
            } );
            this._buttonDel.onclick = Bridge.fn.combine(this._buttonDel.onclick, Bridge.fn.bind(this, $_.Bridge.ToDo.Components.ToDoItem.f2));
        },
        createHTMLItem: function () {
            var divRow = document.createElement('div');
            divRow.className = "row";
            divRow.id = this._id.toString();

            var divCheckbox = Bridge.merge(document.createElement('div'), {
                className: "col-md-1"
            } );

            divCheckbox.appendChild(this._cbItem);


            var divLabel = Bridge.merge(document.createElement('div'), {
                className: "col-md-10"
            } );
            divLabel.appendChild(this._pLabel);

            var divButtonDel = Bridge.merge(document.createElement('div'), {
                className: "col-md-1"
            } );
            divButtonDel.appendChild(this._buttonDel);


            divRow.appendChild(divCheckbox);
            divRow.appendChild(divLabel);
            divRow.appendChild(divButtonDel);

            return divRow;
        }
    });

    Bridge.ns("Bridge.ToDo.Components.ToDoItem", $_);

    Bridge.apply($_.Bridge.ToDo.Components.ToDoItem, {
        f1: function () {
            this._complete = !this._complete;
            !Bridge.staticEquals(this.completeClicked, null) ? this.completeClicked(this._complete) : null;
        },
        f2: function () {
            !Bridge.staticEquals(this.deleteClicked, null) ? this.deleteClicked() : null;
        }
    });

    Bridge.define("Bridge.ToDo.Components.ToDoItemList", {
        _divItemList: null,
        _todoItemList: null,
        ctor: function (selector) {
            this.$initialize();
            this._todoItemList = new (System.Collections.Generic.List$1(Bridge.ToDo.Components.ToDoItem))();
            this._divItemList = Bridge.cast(document.getElementById(selector), HTMLDivElement);
        },
        add: function (todoItem) {
            this._todoItemList.add(todoItem);
            this._divItemList.appendChild(todoItem.getDivItem());
        },
        remove: function (todoItem) {
            this._todoItemList.remove(todoItem);

            if (this._divItemList.contains(todoItem.getDivItem())) {
                this._divItemList.removeChild(todoItem.getDivItem());
            }
        },
        showAll: function () {
            var $t;
            this.clearAllItem();
            $t = Bridge.getEnumerator(this._todoItemList);
            while ($t.moveNext()) {
                var item = $t.getCurrent();
                this._divItemList.appendChild(item.getDivItem());
            }
        },
        showActive: function () {
            var $t;
            this.clearAllItem();
            var active = System.Linq.Enumerable.from(this._todoItemList).where($_.Bridge.ToDo.Components.ToDoItemList.f1).toList(Bridge.ToDo.Components.ToDoItem);
            $t = Bridge.getEnumerator(active);
            while ($t.moveNext()) {
                var item = $t.getCurrent();
                this._divItemList.appendChild(item.getDivItem());
            }
        },
        showCompleted: function () {
            var $t;
            this.clearAllItem();
            var completed = System.Linq.Enumerable.from(this._todoItemList).where($_.Bridge.ToDo.Components.ToDoItemList.f2).toList(Bridge.ToDo.Components.ToDoItem);
            $t = Bridge.getEnumerator(completed);
            while ($t.moveNext()) {
                var item = $t.getCurrent();
                this._divItemList.appendChild(item.getDivItem());
            }
        },
        /**
         * Only clear UI item
         *
         * @instance
         * @private
         * @this Bridge.ToDo.Components.ToDoItemList
         * @memberof Bridge.ToDo.Components.ToDoItemList
         * @return  {void}
         */
        clearAllItem: function () {
            while (this._divItemList.firstChild != null) {
                this._divItemList.removeChild(this._divItemList.firstChild);
            }
        },
        itemsLeft: function () {
            var result = 0;
            result = System.Linq.Enumerable.from(this._todoItemList).where($_.Bridge.ToDo.Components.ToDoItemList.f1).count();
            return result;
        },
        completeCount: function () {
            var result = 0;
            result = System.Linq.Enumerable.from(this._todoItemList).where($_.Bridge.ToDo.Components.ToDoItemList.f2).count();
            return result;
        },
        isEmpty: function () {
            return System.Linq.Enumerable.from(this._todoItemList).count() === 0;
        },
        allComplete: function () {
            return System.Linq.Enumerable.from(this._todoItemList).where($_.Bridge.ToDo.Components.ToDoItemList.f2).count() === System.Linq.Enumerable.from(this._todoItemList).count();
        },
        deleteCompleted: function () {
            var $t;
            var completed = System.Linq.Enumerable.from(this._todoItemList).where($_.Bridge.ToDo.Components.ToDoItemList.f2).toList(Bridge.ToDo.Components.ToDoItem);
            $t = Bridge.getEnumerator(completed);
            while ($t.moveNext()) {
                var item = $t.getCurrent();
                this.remove(item);
            }
        },
        setAllComplete: function (complete) {
            var $t;
            $t = Bridge.getEnumerator(this._todoItemList);
            while ($t.moveNext()) {
                var item = $t.getCurrent();
                item.setComplete(complete);
            }
        }
    });

    Bridge.ns("Bridge.ToDo.Components.ToDoItemList", $_);

    Bridge.apply($_.Bridge.ToDo.Components.ToDoItemList, {
        f1: function (e) {
            return e.getComplete() === false;
        },
        f2: function (e) {
            return e.getComplete() === true;
        }
    });
});
