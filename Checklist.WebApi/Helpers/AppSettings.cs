using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Checklist.WebApi.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public BaseUrls BaseUrls { get; set; }
    }

    public class BaseUrls
    {      
        public string WebAllowCors { get; set; }
    }
}
