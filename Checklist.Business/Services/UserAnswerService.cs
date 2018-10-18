using Checklist.Data.Dtos;
using Checklist.Data.Entities;
using Checklist.WebApi.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Checklist.Business.Services
{
    public interface IUserAnswerService
    {
        Task<ChecklistQuestionDto> GetChecklistQuestion(int checklistId);
        Task<bool> SaveChecklistAnswer(ChecklistAnswerDto checklistAnswerDto);
    }

    public class UserAnswerService : IUserAnswerService
    {
        private DataContext _context;

        public UserAnswerService(DataContext context)
        {
            _context = context;
        }

        public async Task<ChecklistQuestionDto> GetChecklistQuestion(int checklistId)
        {
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

            var questions = await _context.Questions.Where(q => q.CheckListId == checklistId).ToListAsync();

            var checklistQuestion = new ChecklistQuestionDto();
            var checklist = await _context.CheckLists.FirstOrDefaultAsync(c => c.Id == checklistId);
            checklistQuestion.Id = checklist.Id;
            checklistQuestion.HubName = checklist.HubName;
            checklistQuestion.CreatedOn = checklist.CreatedOn;
            checklistQuestion.Questions = questions;
            

            var query = await _context.Questions.Include(h => h.Heading).Include(s => s.SubHeading).Include(ss => ss.SubOfSubHeading)
                .Where(w => w.CheckListId == checklistId)
                .GroupBy(gb => new { gb.Heading, gb.SubHeading, gb.SubOfSubHeading }) //, gb.SubHeading, gb.SubOfSubHeading
                .Select(g => new { g }).ToListAsync();
            
            
            foreach (var item in query)
            {
                var heading = new HeadingQuestionDto { MainHeading = item.g.Key.Heading, SubHeading = item.g.Key.SubHeading,
                    SubOfSubHeading = item.g.Key.SubOfSubHeading, Questions = item.g.ToList() };
                checklistQuestion.HeadingQuestion.Add(heading);                

            }

            return checklistQuestion;
        }

        public async Task<bool> SaveChecklistAnswer(ChecklistAnswerDto checklist)
        {
            var resultItem = new Result
            {
                CheckListId = checklist.CheckListId,
                UserId = checklist.UserId,
                SubmitOn = DateTime.Now,
                SignatureBase64 = checklist.UserSignature,
                CompanyName = checklist.CompanyName,
                EmployementType = checklist.EmployementType == 1 ? EmployementType.PermanentStaff : EmployementType.Contractor,
                HRMS = checklist.HRMS,
                Name = checklist.Name,
                Remarks = checklist.Remarks
            };

            var result = await _context.Results.AddAsync(resultItem);
            
            foreach (var item in checklist.AnswerItems){
                var answer = new Answer { Created = DateTime.Now, QuesionId = item.Id, ResultId = result.Entity.Id, UserAnswer = item.Answer};
                await _context.Answers.AddAsync(answer);
                
            }
            
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
