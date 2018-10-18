using Checklist.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Checklist.Data.Dtos
{
    public class ResultDto
    {
        public Result Result { get; set; }
        public List<Answer> Answers { get; set; }


        public ResultDto()
        {
            Answers = new List<Answer>();
        }
    }
}
