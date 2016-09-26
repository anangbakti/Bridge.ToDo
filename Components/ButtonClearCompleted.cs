using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace Bridge.ToDo.Components
{
    public class ButtonClearCompleted
    {
        public Action OnClick;

        private HTMLInputElement btnClearCompleted;

        public ButtonClearCompleted(string selector) {
            btnClearCompleted = (HTMLInputElement)Document.GetElementById(selector);
            btnClearCompleted.OnClick += new Action<MouseEvent<HTMLInputElement>>(delegate
            {
                OnClick?.Invoke();
            });
        }

        public void Show() {
            btnClearCompleted.ClassList.Remove("hidden");
        }

        public void Hide()
        {
            btnClearCompleted.ClassList.Add("hidden");
        }
    }
}
