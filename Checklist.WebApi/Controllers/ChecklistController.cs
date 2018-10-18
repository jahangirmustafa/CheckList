using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Checklist.Business.Services;
using Checklist.Data.Dtos;
using Checklist.Data.Entities;
using Checklist.WebApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Checklist.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Checklist")]
    [Authorize]
    public class ChecklistController : Controller
    {
        private IChecklistService _checklistService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public ChecklistController(IChecklistService checklistService, IMapper mapper,  IOptions<AppSettings> appSettings)
        {
            _checklistService = checklistService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route("CreateChecklist")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateChecklist([FromBody]CheckListDto checkListDto)
        {            
            try
            {
                var result = await _checklistService.Create(checkListDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("UpdateChecklist")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateChecklist([FromBody]CheckListDto checkListDto)
        {
            try
            {
                var result = await _checklistService.Update(checkListDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("AddHeading")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddHeading([FromBody]Heading heading)
        {
            try
            {
                if (heading.Id == 0){
                    var result = await _checklistService.AddHeading(heading);
                    return Ok(result);
                }
                else {
                    var result = await _checklistService.UpdateHeading(heading);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("GetChecklist")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetChecklist()
        {
            try
            {
                var result = await _checklistService.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetHeaderByChecklistId")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetHeaderByChecklistId([FromQuery]int id)
        {
            try
            {
                var result = await _checklistService.GetHeadingByChecklistId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetHeadingsByType")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetHeadingsByType([FromQuery]int id)
        {
            try
            {
                var mainHeading = await _checklistService.GetHeadingByType(id, HeadingType.MainHeading);
                var subHeading = await _checklistService.GetHeadingByType(id, HeadingType.SubHeading);
                var subOfSubHeading = await _checklistService.GetHeadingByType(id, HeadingType.SubOfSubHeading);

                return Ok(new {  mainHeading, subHeading, subOfSubHeading });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("SaveQuestion")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SaveQuestion([FromBody]Question question)
        {
            try
            {
                if (question.Id == 0)
                {
                    var result = await _checklistService.CreateQuestion(question);
                    return Ok(result);
                }
                else
                {
                    var result = await _checklistService.UpdateQuestion(question);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetAllQuestion")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllQuestion([FromQuery]int id)
        {
            try
            {
                var result = await _checklistService.GetAllQuestion(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("DeleteQuestion")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteQuestion([FromQuery]int id)
        {
            try
            {
                var result = await _checklistService.DeleteQuestion(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetChecklistForUser")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetChecklistForUser()
        {
            try
            {
                int userId = this.GetCurrentUserId();
                var result = await _checklistService.GetChecklistByUserId(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}