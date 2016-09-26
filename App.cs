using Bridge.Html5;
using System;
using System.Linq;
using Bridge.ToDo.Components;

namespace Bridge.ToDo
{
    public class App
    {
        private static ButtonCheckAll buttonCheckAll;
        private static InputToDoItem inputToDoItem;
        private static ToDoItemList todoItemList;
        private static Footer footer;
        private static HTMLDivElement itemLeft;
        private static ButtonClearCompleted buttonClearCompleted;
        private static RadioButtonQueryItems radioButtonQueryItems;

        public static void Main()
        {
            InitComponent();

            // To confirm Bridge.NET is working:
            // 1. Build this project (Ctrl + Shift + B)
            // 2. Browse to file /Bridge/www/demo.html
            // 3. Right-click on file and select "View in Browser" (Ctrl + Shift + W)
            // 4. File should open in a browser, click the "Submit" button
            // 5. Success!
        }

        private static void InitComponent()
        {
            InitButtonCheckAll();
            InitInputToDoItem();
            InitToDoItemList();
            InitFooter();
            InitItemLeft();
            InitButtonClearCompleted();
        }

        private static void InitButtonClearCompleted()
        {
            buttonClearCompleted = new ButtonClearCompleted("btnClearCompleted");
            buttonClearCompleted.OnClick += delegate
            {
                todoItemList.DeleteCompleted();
            };
        }


        private static void InitFooter()
        {
            footer = new Footer("footer");
        }

        private static void InitItemLeft()
        {
            itemLeft = (HTMLDivElement)Document.GetElementById("itemsLeft");
        }

        private static void InitButtonCheckAll()
        {
            buttonCheckAll = new ButtonCheckAll("#btnCheckAll");
            buttonCheckAll.Clicked += delegate (bool checkAll)
            {
                todoItemList.SetAllComplete(checkAll);
                SetButtonClearCompletedVisible();               
            };
        }

        private static void InitInputToDoItem()
        {
            inputToDoItem = new InputToDoItem("#inputToDoItem");
            inputToDoItem.OnKeyDownEnter += delegate
            {
                //Html5.Window.Alert("OK Entered");
                AddToDoItem(inputToDoItem.Val);
                inputToDoItem.Val = "";
            };
        }

        private static void InitToDoItemList()
        {
            todoItemList = new ToDoItemList("todoItemList");
        }

        private static void AddToDoItem(string todoItemVal)
        {
            if (string.IsNullOrEmpty(todoItemVal)) return;

            ToDoItem todoItem = new ToDoItem(todoItemVal);
            todoItemList.Add(todoItem);

            todoItem.DeleteClicked += delegate
            {
                //Html5.Window.Alert("Delete Clicked");
                todoItemList.Remove(todoItem);
                if (todoItemList.IsEmpty())
                {
                    footer.Hide();
                }
                UpdateItemsLeft();
            };

            todoItem.CompleteClicked += delegate
            {
                UpdateItemsLeft();
            };

            UpdateItemsLeft();
            footer.Show();
        }

        private static void UpdateItemsLeft()
        {
            var jmlItemsLeft = todoItemList.ItemsLeft();
            itemLeft.InnerHTML = jmlItemsLeft.ToString() + " Items left";
            SetButtonClearCompletedVisible();            
            buttonCheckAll.CheckAll = todoItemList.AllComplete();                
        }

        private static void SetButtonClearCompletedVisible() {
            var jumlahComplete = todoItemList.CompleteCount();
            if (jumlahComplete > 0)
            {
                buttonClearCompleted.Show();
            }
            else
            {
                buttonClearCompleted.Hide();
            }
        }
    }
}