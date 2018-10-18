using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Checklist.Business.Services;
using Checklist.WebApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Checklist.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Result")]
    public class ResultController : Controller
    {
        private IResultService _resultService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public ResultController(IResultService resultService, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _resultService = resultService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        [Route("GetResult")]
        [Authorize(Roles = "Admin, SubAdmin")]
        public async Task<IActionResult> GetResult(string hubName, string year, string employementType)
        {
            try
            {
                int userId = this.GetCurrentUserId();
                var result = await _resultService.GetResult(hubName, year, employementType, userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetResultAnswer")]
        [Authorize(Roles = "Admin, SubAdmin")]
        public async Task<IActionResult> GetResultAnswer(int checklistId, int resultId)
        {
            try
            {
                var result = await _resultService.GetResultAnswer(resultId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetHubItems")]
        [Authorize(Roles = "Admin, SubAdmin")]
        public async Task<IActionResult> GetHubItems()
        {
            var hub = await _resultService.GetHubItems();
            return Ok(hub);
        }

        [HttpGet]
        [Route("DeleteResult")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteResult(int resultId)
        {
            if (resultId == 0)
                return BadRequest();

            var hub = await _resultService.DeleteResult(resultId);
            return Ok(hub);
        }

    }
}