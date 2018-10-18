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
    public interface IResultService
    {
        Task<List<Result>> GetResult(string hubName, string year, string employementType, int userId);
        Task<ResultDto> GetResultAnswer(int resultId);
        Task<List<SelectItem>> GetHubItems();
        Task<bool> DeleteResult(int resultId);
    }

    public class ResultService : IResultService
    {
        private DataContext _context;

        public ResultService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Result>> GetResult(string hubId, string year, string employementType, int userId)
        {
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;          
            var query = _context.Results.AsQueryable();

            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if(user.Role == UserRole.SubAdmin)
            {
                query = query.Where(u => u.Users.UserSubAdminId == user.Id);
            }

            if (hubId != "null")
            {
                query = query.Where(q => q.CheckListId == Convert.ToInt32(hubId));
            }

            if (year != "null")
            {
                query = query.Where(q => q.SubmitOn.Year == Convert.ToInt32(year));
            }

            if (employementType != "null")
            {
                var enEmployementType = Convert.ToInt32(employementType) == 1 ? EmployementType.PermanentStaff : EmployementType.Contractor;
                query = query.Where(q => q.EmployementType == enEmployementType);
            }

            return await query.ToListAsync();
        }

        public async Task<ResultDto> GetResultAnswer(int resultId)
        {
            var result = await _context.Results.FirstOrDefaultAsync(r => r.Id == resultId);
            var answers = await _context.Answers.Include(q => q.Question).Where(a => a.ResultId == resultId).OrderBy(o => o.QuesionId).ToListAsync();

            return new ResultDto { Result = result, Answers = answers };
        }

        public async Task<List<SelectItem>> GetHubItems()
        {
            var query = await (from u in _context.CheckLists
                               where u.IsActive == true
                               select new SelectItem { Id = u.Id, Text = u.HubName }).ToListAsync();
            return query;
        }

        public async Task<bool> DeleteResult(int resultId)
        {
            var result = await _context.Results.FirstOrDefaultAsync(r => r.Id == resultId);
            var answers =  _context.Answers.Where(a => a.ResultId == resultId);

            _context.Results.Remove(result);
            _context.Answers.RemoveRange(answers);
            await _context.SaveChangesAsync();
                 
            return true;
        }
    }
}
