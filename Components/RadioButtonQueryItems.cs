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
        private HTMLInputElement rbShowAll;
        private HTMLInputElement rbShowActive;
        private HTMLInputElement rbShowCompleted;

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
            rbShowAll = (HTMLInputElement)Document.GetElementById(selectorShowAll);
            rbShowActive = (HTMLInputElement)Document.GetElementById(selectorShowActive);
            rbShowCompleted = (HTMLInputElement)Document.GetElementById(selectorShowCompleted);

            rbShowAll.OnClick += new Action<MouseEvent<HTMLInputElement>>(delegate
            {
                Selected = ShowOptions.All;
                Click?.Invoke(Selected);
            });

            rbShowActive.OnClick += new Action<MouseEvent<HTMLInputElement>>(delegate
            {
                Selected = ShowOptions.Active;
                Click?.Invoke(Selected);
            });

            rbShowCompleted.OnClick += new Action<MouseEvent<HTMLInputElement>>(delegate
            {
                Selected = ShowOptions.Completed;
                Click?.Invoke(Selected);
            });

        }
    }
}
