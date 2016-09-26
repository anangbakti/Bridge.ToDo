using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.jQuery2;

namespace Bridge.ToDo.Components
{

    public class InputToDoItem
    {
        public Action OnKeyDownEnter;
        private jQuery _thisInput;

        public string Val { get { return _thisInput.Val(); }  set { _thisInput.Val(value); } }

        public InputToDoItem(string selector)
        {
            _thisInput = new jQuery(selector);

            _thisInput.KeyUp(new Action<jQueryKeyboardEvent>(delegate (jQueryKeyboardEvent key)
            {
                if (key.KeyCode == 13)
                {
                    OnKeyDownEnter?.Invoke();
                }
            }));
        }
    }


}
