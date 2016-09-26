using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.Html5;

namespace Bridge.ToDo.Components
{
    public class Footer
    {
        HTMLDivElement _footer;

        public Footer(string selector) {
            _footer = (HTMLDivElement)Document.GetElementById("footer");
        }

        public void Show() {
            _footer.RemoveAttribute("hidden");
        }

        public void Hide() {
            _footer.SetAttribute("hidden", "hidden");
        }

    }
}
