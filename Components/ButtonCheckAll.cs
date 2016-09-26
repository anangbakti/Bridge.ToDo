using System;
using Bridge.jQuery2;

namespace Bridge.ToDo.Components
{
    public class ButtonCheckAll
    {
        public Action<bool> Clicked;
        private bool _checkAll = false;
        private jQuery _thisButton;

        public bool CheckAll { set { _checkAll = value; ChangeIcon(); } }

        public ButtonCheckAll(string selector)
        {
            _thisButton = new jQuery(selector);
            _thisButton.Click(new Action(delegate ()
            {
                _checkAll = !_checkAll;
                ChangeIcon();
                Clicked?.Invoke(_checkAll);
            }));
        }

        public void ChangeIcon()
        {
            if (_checkAll)
            {
                //change icon
                _thisButton.RemoveClass("glyphicon-chevron-down");
                _thisButton.AddClass("glyphicon-ok");
            }
            else
            {
                _thisButton.RemoveClass("glyphicon-ok");
                _thisButton.AddClass("glyphicon-chevron-down");
            }
        }
    }

}
