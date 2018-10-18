using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Checklist.WebApi.Helpers
{
    public static class UserHelper
    {
        public static int GetCurrentUserId(this Controller controller)
        {
            return Convert.ToInt32(controller.User.Claims.FirstOrDefault().Value);
        }
    }
}
