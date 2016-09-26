using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;
using Bridge.jQuery2;

namespace Bridge.ToDo.Components
{
    public class ToDoItemList 
    {
        private HTMLDivElement _divItemList;        
        private List<ToDoItem> _todoItemList;

        public ToDoItemList(string selector) {
            _todoItemList = new List<ToDoItem>();
            _divItemList = (HTMLDivElement)Document.GetElementById(selector);            
        }
        
        public void Add(ToDoItem todoItem)
        {
            _todoItemList.Add(todoItem);
            _divItemList.AppendChild(todoItem.DivItem);
        }

        public void Remove(ToDoItem todoItem) {
            _todoItemList.Remove(todoItem);            

            if (_divItemList.Contains(todoItem.DivItem)) {
                _divItemList.RemoveChild(todoItem.DivItem);
            }            
        }
        
        public void ShowAll() {
            ClearAllItem();
            foreach (var item in _todoItemList)
            {
                _divItemList.AppendChild(item.DivItem);
            }
        }

        public void ShowActive()
        {
            ClearAllItem();
            var active = _todoItemList.Where(e => e.Complete == false).ToList();
            foreach(var item in active)
            {
                _divItemList.AppendChild(item.DivItem);
            }
        }

        public void ShowCompleted()
        {
            ClearAllItem();
            var completed = _todoItemList.Where(e => e.Complete == true).ToList();
            foreach (var item in completed)
            {
                _divItemList.AppendChild(item.DivItem);
            }
        }

        /// <summary>
        /// Only clear UI item
        /// </summary>
        private void ClearAllItem() {
            while (_divItemList.FirstChild != null) {
                _divItemList.RemoveChild(_divItemList.FirstChild);
            }
        }

        public int ItemsLeft() {
            int result = 0;
            result = _todoItemList.Where(e => e.Complete == false).Count();
            return result;
        }

        public int CompleteCount() {
            int result = 0;
            result = _todoItemList.Where(e => e.Complete == true).Count();
            return result;
        }

        public bool IsEmpty() {
            return _todoItemList.Count() == 0;
        }

        public bool AllComplete() {
            return _todoItemList.Where(e => e.Complete == true).Count() == _todoItemList.Count();
        }

        public void DeleteCompleted() {
            var completed = _todoItemList.Where(e => e.Complete == true).ToList();
            foreach (var item in completed)
            {
                Remove(item);
            }
        }

        public void SetAllComplete(bool complete) {
            foreach (var item in _todoItemList) {
                item.Complete = complete;
            }
        }
               

    }
}
