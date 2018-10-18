using System;
using System.Collections.Generic;
using System.Text;

namespace Checklist.Data.Dtos
{
    public class ChangePasswordDto
    {
       
        public string Username { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        
    }
}
