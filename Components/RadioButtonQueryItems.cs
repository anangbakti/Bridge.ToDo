using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace Bridge.ToDo.Components
{
    public class RadioButtonQueryItems
    {
        private HTMLLabelElement rbShowAll;
        private HTMLLabelElement rbShowActive;
        private HTMLLabelElement rbShowCompleted;

        public Action<ShowOptions> Click;

        public enum ShowOptions {
            All,
            Active,
            Completed
        }

        public ShowOptions Selected;

        public RadioButtonQueryItems(string selectorShowAll,
            string selectorShowActive, string selectorShowCompleted) {
            Selected = ShowOptions.All;
            rbShowAll = (HTMLLabelElement)Document.GetElementById(selectorShowAll);
            rbShowActive = (HTMLLabelElement)Document.GetElementById(selectorShowActive);
            rbShowCompleted = (HTMLLabelElement)Document.GetElementById(selectorShowCompleted);

            rbShowAll.OnClick += new Action<MouseEvent<HTMLLabelElement>>(delegate
            {
                Selected = ShowOptions.All;
                Click?.Invoke(Selected);
            });

            rbShowActive.OnClick += new Action<MouseEvent<HTMLLabelElement>>(delegate
            {
                Selected = ShowOptions.Active;
                Click?.Invoke(Selected);
            });

            rbShowCompleted.OnClick += new Action<MouseEvent<HTMLLabelElement>>(delegate
            {
                Selected = ShowOptions.Completed;
                Click?.Invoke(Selected);
            });

        }
    }
}
