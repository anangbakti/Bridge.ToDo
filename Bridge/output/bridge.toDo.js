Bridge.assembly("Bridge.ToDo", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.ToDo.App", {
        statics: {
            buttonCheckAll: null,
            inputToDoItem: null,
            todoItemList: null,
            footer: null,
            itemLeft: null,
            buttonClearCompleted: null,
            radioButtonQueryItems: null,
            initComponent: function () {
                Bridge.ToDo.App.initButtonCheckAll();
                Bridge.ToDo.App.initInputToDoItem();
                Bridge.ToDo.App.initToDoItemList();
                Bridge.ToDo.App.initFooter();
                Bridge.ToDo.App.initItemLeft();
                Bridge.ToDo.App.initButtonClearCompleted();
                Bridge.ToDo.App.initRadioButtonQueryItems();
            },
            initRadioButtonQueryItems: function () {
                Bridge.ToDo.App.radioButtonQueryItems = new Bridge.ToDo.Components.RadioButtonQueryItems("rbShowAll", "rbShowActive", "rbShowCompleted");
                Bridge.ToDo.App.radioButtonQueryItems.click = Bridge.fn.combine(Bridge.ToDo.App.radioButtonQueryItems.click, $_.Bridge.ToDo.App.f1);
            },
            initButtonClearCompleted: function () {
                Bridge.ToDo.App.buttonClearCompleted = new Bridge.ToDo.Components.ButtonClearCompleted("btnClearCompleted");
                Bridge.ToDo.App.buttonClearCompleted.onClick = Bridge.fn.combine(Bridge.ToDo.App.buttonClearCompleted.onClick, $_.Bridge.ToDo.App.f2);
            },
            initFooter: function () {
                Bridge.ToDo.App.footer = new Bridge.ToDo.Components.Footer("footer");
            },
            initItemLeft: function () {
                Bridge.ToDo.App.itemLeft = Bridge.cast(document.getElementById("itemsLeft"), HTMLDivElement);
            },
            initButtonCheckAll: function () {
                Bridge.ToDo.App.buttonCheckAll = new Bridge.ToDo.Components.ButtonCheckAll("#btnCheckAll");
                Bridge.ToDo.App.buttonCheckAll.clicked = Bridge.fn.combine(Bridge.ToDo.App.buttonCheckAll.clicked, $_.Bridge.ToDo.App.f3);
            },
            initInputToDoItem: function () {
                Bridge.ToDo.App.inputToDoItem = new Bridge.ToDo.Components.InputToDoItem("#inputToDoItem");
                Bridge.ToDo.App.inputToDoItem.onKeyDownEnter = Bridge.fn.combine(Bridge.ToDo.App.inputToDoItem.onKeyDownEnter, $_.Bridge.ToDo.App.f4);
            },
            initToDoItemList: function () {
                Bridge.ToDo.App.todoItemList = new Bridge.ToDo.Components.ToDoItemList("todoItemList");
            },
            addToDoItem: function (todoItemVal) {
                if (System.String.isNullOrEmpty(todoItemVal)) {
                    return;
                }

                var todoItem = new Bridge.ToDo.Components.ToDoItem(todoItemVal);
                Bridge.ToDo.App.todoItemList.add(todoItem);

                todoItem.deleteClicked = Bridge.fn.combine(todoItem.deleteClicked, function () {
                    //Html5.Window.Alert("Delete Clicked");
                    Bridge.ToDo.App.todoItemList.remove(todoItem);
                    Bridge.ToDo.App.updateItemsLeft();
                });

                todoItem.completeClicked = Bridge.fn.combine(todoItem.completeClicked, $_.Bridge.ToDo.App.f5);

                Bridge.ToDo.App.updateItemsLeft();
                Bridge.ToDo.App.footer.show();
            },
            updateItemsLeft: function () {
                var jmlItemsLeft = Bridge.ToDo.App.todoItemList.itemsLeft();
                Bridge.ToDo.App.itemLeft.innerHTML = System.String.concat(jmlItemsLeft.toString(), " Items left");
                Bridge.ToDo.App.setButtonClearCompletedVisible();
                Bridge.ToDo.App.buttonCheckAll.setCheckAll(Bridge.ToDo.App.todoItemList.allComplete());

                if (Bridge.ToDo.App.todoItemList.isEmpty()) {
                    Bridge.ToDo.App.buttonCheckAll.setCheckAll(false);
                    Bridge.ToDo.App.radioButtonQueryItems.selected = Bridge.ToDo.Components.RadioButtonQueryItems.ShowOptions.All;
                    Bridge.ToDo.App.footer.hide();
                }
            },
            setButtonClearCompletedVisible: function () {
                var jumlahComplete = Bridge.ToDo.App.todoItemList.completeCount();
                if (jumlahComplete > 0) {
                    Bridge.ToDo.App.buttonClearCompleted.show();
                } else {
                    Bridge.ToDo.App.buttonClearCompleted.hide();
                }
            }
        },
        $main: function () {
            Bridge.ToDo.App.initComponent();

            // To confirm Bridge.NET is working:
            // 1. Build this project (Ctrl + Shift + B)
            // 2. Browse to file /Bridge/www/demo.html
            // 3. Right-click on file and select "View in Browser" (Ctrl + Shift + W)
            // 4. File should open in a browser, click the "Submit" button
            // 5. Success!
        }
    });

    var $_ = {};

    Bridge.ns("Bridge.ToDo.App", $_);

    Bridge.apply($_.Bridge.ToDo.App, {
        f1: function () {
            if (Bridge.ToDo.App.radioButtonQueryItems.selected === Bridge.ToDo.Components.RadioButtonQueryItems.ShowOptions.Active) {
                Bridge.ToDo.App.todoItemList.showActive();
            } else if (Bridge.ToDo.App.radioButtonQueryItems.selected === Bridge.ToDo.Components.RadioButtonQueryItems.ShowOptions.Completed) {
                Bridge.ToDo.App.todoItemList.showCompleted();
            } else { //show all
                Bridge.ToDo.App.todoItemList.showAll();
            }
        },
        f2: function () {
            Bridge.ToDo.App.todoItemList.deleteCompleted();
            Bridge.ToDo.App.updateItemsLeft();
        },
        f3: function (checkAll) {
            Bridge.ToDo.App.todoItemList.setAllComplete(checkAll);
            Bridge.ToDo.App.updateItemsLeft();
        },
        f4: function () {
            //Html5.Window.Alert("OK Entered");
            Bridge.ToDo.App.addToDoItem(Bridge.ToDo.App.inputToDoItem.getVal());
            Bridge.ToDo.App.inputToDoItem.setVal("");
        },
        f5: function () {
            Bridge.ToDo.App.updateItemsLeft();
        }
    });
});
