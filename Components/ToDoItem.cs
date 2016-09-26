using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.jQuery2;
using Bridge.Html5;

namespace Bridge.ToDo.Components
{
    public class ToDoItem
    {
        public Action DeleteClicked;
        public Action<bool> CompleteClicked;

        private bool _complete = false;
        private string _label = "";
        private Guid _id;
        private HTMLInputElement _cbItem;
        private HTMLParagraphElement _pLabel;
        private HTMLSpanElement _buttonDel;
        private HTMLDivElement _divMainItem;

        public string Label { get { return _label; } }
        public HTMLDivElement DivItem { get { return _divMainItem; } }
        public string ItemID { get { return _id.ToString(); } }
        public bool Complete { get { return _complete; }
            set {
                _complete = value;
                _cbItem.Checked = _complete;
            }
        }

        public ToDoItem(string label) {
            _id = Guid.NewGuid();
            _label = label;
            InitComponents(_label);
        }

        private void InitComponents(string label) {
            InitCheckboxItem();
            InitLabel(label);
            InitButtonDel();
            _divMainItem = CreateHTMLItem();
        }

        private void InitCheckboxItem() {
            _cbItem = new HTMLInputElement()
            {
                Type = InputType.Checkbox
            };
            _cbItem.OnClick += new Action<MouseEvent<HTMLInputElement>>(delegate {
                _complete = !_complete;
                CompleteClicked?.Invoke(_complete);
            });
        }

        private void InitLabel(string label) {
            _pLabel = new HTMLParagraphElement()
            {
                ClassName = "text-left",
                InnerHTML = label
            };
        }

        private void InitButtonDel() {
            _buttonDel = new HTMLSpanElement()
            {
                ClassName = "glyphicon glyphicon-remove-sign text-right"
            };
            _buttonDel.OnClick += new Action<Html5.MouseEvent<Html5.HTMLSpanElement>>(delegate {
                DeleteClicked?.Invoke();
            });
        }

        private HTMLDivElement CreateHTMLItem()
        {
            var divRow = new HTMLDivElement();
            divRow.ClassName = "row";
            divRow.Id = _id.ToString();

            var divCheckbox = new HTMLDivElement()
            {
                ClassName = "col-md-1"
            };

            divCheckbox.AppendChild(_cbItem);
            

            var divLabel = new HTMLDivElement()
            {
                ClassName = "col-md-10"
            }; 
            divLabel.AppendChild(_pLabel);

            var divButtonDel = new HTMLDivElement()
            {
                ClassName = "col-md-1"
            }; 
            divButtonDel.AppendChild(_buttonDel);


            divRow.AppendChild(divCheckbox);
            divRow.AppendChild(divLabel);
            divRow.AppendChild(divButtonDel);

            return divRow;
        }

    }
}
