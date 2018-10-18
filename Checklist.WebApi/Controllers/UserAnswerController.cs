using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Checklist.Business.Services;
using Checklist.Data.Dtos;
using Checklist.WebApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Checklist.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/UserAnswer")]
    [Authorize]
    public class UserAnswerController : Controller
    {
        private IUserAnswerService _userAnswerService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UserAnswerController(IUserAnswerService userAnswerService, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _userAnswerService = userAnswerService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        [Route("GetChecklistQuestion")]
        [Authorize(Roles = "Admin, SubAdmin ,User")]
        public async Task<IActionResult> GetChecklistQuestion(int id)
        {
            try
            {
                var result = await _userAnswerService.GetChecklistQuestion(id);
                var dataChecklist = result.HeadingQuestion.GroupBy(g => new { g.MainHeading }).Select(data => new { data });              

                return Ok(new { result.CreatedOn, result.HubName, result.Id, dataChecklist, result.Questions });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("SaveChecklistAnswer")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> SaveChecklistAnswer([FromBody]ChecklistAnswerDto checkList)
        {
            try
            {                
                checkList.UserId = this.GetCurrentUserId();
                var result = await _userAnswerService.SaveChecklistAnswer(checkList);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }





    }
}