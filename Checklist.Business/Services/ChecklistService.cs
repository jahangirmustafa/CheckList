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
    public interface IChecklistService
    {       
        
        Task<CheckListDto> Create(CheckListDto checkListDto);
        Task<List<CheckList>> GetAll();
        Task<List<CheckList>> GetChecklistByUserId(int userId);
        Task<List<HeadingDto>> GetHeadingByChecklistId(int id);
        Task<CheckListDto> Update(CheckListDto checkListDto);
        Task<Heading> AddHeading(Heading heading);
        Task<Heading> UpdateHeading(Heading heading);
        Task<List<SelectItem>> GetHeadingByType(int checklistId, HeadingType headingType);

        Task<Question> CreateQuestion(Question question);
        Task<Question> UpdateQuestion(Question question);
        Task<List<Question>> GetAllQuestion(int checklistId);
        Task<bool> DeleteQuestion(int id);
        int GetSubAdminIdByText(string subAdminText);

    }

    public class ChecklistService : IChecklistService
    {
        private DataContext _context;

        public ChecklistService(DataContext context)
        {
            _context = context;
        }

        public async Task<CheckListDto> Create(CheckListDto checkListDto)
        {
            var checkList = new CheckList { CreatedOn = DateTime.Now, HubName = checkListDto.HubName, IsActive = true, SubAdminId=  checkListDto.SubAdminId };
            var checkListResult = await _context.AddAsync(checkList);

            var heading = new Heading { CheckList = checkListResult.Entity, HeadingType = HeadingType.MainHeading, Content = checkListDto.Heading};
            var headingResult = await _context.AddAsync(heading);

            await _context.SaveChangesAsync();
            checkListDto.Id = checkListResult.Entity.Id;
            checkListDto.HeadingId = headingResult.Entity.Id;
            return checkListDto;
        }

        public async Task<CheckListDto> Update(CheckListDto checkListDto)
        {           
            var checkList = await _context.CheckLists.FindAsync(checkListDto.Id);
            checkList.HubName = checkListDto.HubName;
            checkList.IsActive = checkListDto.IsActive;
            checkList.SubAdminId = checkListDto.SubAdminId;
            await _context.SaveChangesAsync();
            return checkListDto;
        }

        public async Task<List<CheckList>> GetAll()
        {
            return await _context.CheckLists.Where(c => c.IsActive == true).ToListAsync();
        }

        public async Task<List<CheckList>> GetChecklistByUserId(int userId)
        {
            var userSubAdminId = _context.Users.FirstOrDefault(u => u.Id == userId).UserSubAdminId.GetValueOrDefault();
            return await _context.CheckLists.Where(c => c.IsActive == true && c.SubAdminId == userSubAdminId).ToListAsync();
        }




        public async Task<List<HeadingDto>> GetHeadingByChecklistId(int id)
        {
            return await _context.Headings
                .Select(s => new HeadingDto { Id = s.Id,  CheckListId = s.CheckListId, Content = s.Content, HeadingType = s.HeadingType.ToString()})
                .Where(w => w.CheckListId == id).ToListAsync();
        }

        public async Task<Heading> AddHeading(Heading heading)
        {
            var result = await _context.Headings.AddAsync(heading);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Heading> UpdateHeading(Heading heading)
        {
            var header = await _context.Headings.FindAsync(heading.Id);
            header.Content = heading.Content;
            header.HeadingType = heading.HeadingType;

            await _context.SaveChangesAsync();
            return header;
        }

        public async Task<List<SelectItem>> GetHeadingByType(int checklistId, HeadingType headingType)
        {
            return await _context.Headings.Where(w => w.CheckListId == checklistId && w.HeadingType == headingType)
                .Select(s => new SelectItem {Id= s.Id, Text= s.Content }).ToListAsync();

        }

        public async Task<Question> CreateQuestion(Question question)
        {
            question.CreatedOn = DateTime.Now;

            question.Option1 = question?.Option1?.Trim() == string.Empty ? null : question?.Option1?.Trim();
            question.Option2 = question?.Option2?.Trim() == string.Empty ? null : question?.Option2?.Trim();
            question.Option3 = question?.Option3?.Trim() == string.Empty ? null : question?.Option3?.Trim();
            question.Option4 = question?.Option4?.Trim() == string.Empty ? null : question?.Option4?.Trim();
            question.Option5 = question?.Option5?.Trim() == string.Empty ? null : question?.Option5?.Trim();
            question.Option6 = question?.Option6?.Trim() == string.Empty ? null : question?.Option6?.Trim();


            var result = await _context.Questions.AddAsync(question);
            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<Question> UpdateQuestion(Question question)
        {
            var result = await _context.Questions.FindAsync(question.Id);
            result.Content = question.Content;
            result.HeaderText = question.HeaderText;
            result.FooterText = question.FooterText;
            result.MainHeadingId = question.MainHeadingId;
            result.SubHeadingId = question.SubHeadingId;
            result.SubOfSubHeadingId = question.SubOfSubHeadingId;

            result.Option1 = question?.Option1?.Trim() == string.Empty ? null : question?.Option1?.Trim();
            result.Option2 = question?.Option2?.Trim() == string.Empty ? null : question?.Option2?.Trim();
            result.Option3 = question?.Option3?.Trim() == string.Empty ? null : question?.Option3?.Trim();
            result.Option4 = question?.Option4?.Trim() == string.Empty ? null : question?.Option4?.Trim();
            result.Option5 = question?.Option5?.Trim() == string.Empty ? null : question?.Option5?.Trim();
            result.Option6 = question?.Option6?.Trim() == string.Empty ? null : question?.Option6?.Trim();

            await _context.SaveChangesAsync();

            return question;
        }

        public async Task<List<Question>> GetAllQuestion(int checklistId)
        {
            return await _context.Questions.Include(i => i.Heading).Include(s => s.SubHeading).Include(ss => ss.SubOfSubHeading)
                .Where(w => w.CheckListId == checklistId).ToListAsync();
        }

        public async Task<bool> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if(question != null)
            {
                _context.Remove(question);
                await _context.SaveChangesAsync();
            }

            return true;

        }

        public async Task<List<CheckList>> GetChecklistForUser()
        {
            return await _context.CheckLists.Where(w => w.IsActive == true).ToListAsync();
        }

        public int GetSubAdminIdByText(string subAdminText)
        {

            return  _context.Users.FirstOrDefault(u => u.Role == UserRole.SubAdmin && u.Username == "Sub-Admin1").Id;
        }


    }
}
