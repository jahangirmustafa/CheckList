using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Checklist.Business.Services;
using Checklist.Data.Entities;
using Checklist.WebApi.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Checklist.Data.Dtos;

namespace Checklist.WebApi.SeedData
{
    internal static class DbInitializer
    {
        public static async Task Initialize(DataContext context, ILogger<DataContext> logger, IHostingEnvironment env)
        {
            context.Database.EnsureCreated();
            // Look for any users.
            if (!context.Users.Any() && !context.CheckLists.Any()){
                await SeedUser(context, logger);
                await SeedChecklist(context, logger);
            }
            //await SeedChecklist(context, logger);
        }

        private static async Task SeedUser(DataContext context, ILogger<DataContext> logger)
        {
            var anyUserExist = await context.Users.AnyAsync();

            if (!anyUserExist)
            {
                string password = "dragon";
                string userPassword = "1111111";

                UserService userService = new UserService(context);
                await userService.Create(new User { FirstName = "Hub", LastName = "Administrator", Username = "Admin", Role = UserRole.Admin}, password);

                // Add Sub Admin and thr user
                for (int i = 1; i < 10; i++)
                {
                    //adds Sub Admin 
                    var subAdmin = await userService.Create(new User { FirstName = "Sub", LastName = $"Admin {i}", Username = $"Sub-Admin{i}", Role = UserRole.SubAdmin }, password);

                    //adds user 
                    if (i != 4) {
                        await userService.Create(new User { FirstName = "Hub", LastName = $" {i}", Username = $"Hub{i}", Role = UserRole.User, UserSubAdminId = subAdmin.Id}, userPassword);
                    }
                    else if(i == 4){
                        await userService.Create(new User { FirstName = "Hub", LastName = $"4hc", Username = $"Hub4hc", Role = UserRole.User, UserSubAdminId = subAdmin.Id }, userPassword);
                        await userService.Create(new User { FirstName = "Hub", LastName = $"4freight", Username = $"Hub4freight", Role = UserRole.User, UserSubAdminId = subAdmin.Id }, userPassword);
                        await userService.Create(new User { FirstName = "Hub", LastName = $"471alps", Username = $"Hub471alps", Role = UserRole.User, UserSubAdminId = subAdmin.Id }, userPassword);
                        await userService.Create(new User { FirstName = "Hub", LastName = $"4aerospace", Username = $"Hub4aerospace", Role = UserRole.User, UserSubAdminId = subAdmin.Id }, userPassword);
                    }
                }

            }
        }

        private static async Task SeedChecklist(DataContext context, ILogger<DataContext> logger)
        {
            try
            { 
                var anyCheckListExist = await context.CheckLists.AnyAsync();
                if (!anyCheckListExist)
                {
                    ChecklistService service = new ChecklistService(context);
                    int subAdminId = service.GetSubAdminIdByText("Sub-Admin1");

                    var checkListDto = new CheckListDto { HubName = "Indoctrination Form on Health, Safety and Environment for Hub 1",
                        Heading = "Emergency  Procedures", SubAdminId = subAdminId };
                    var checklist = await service.Create(checkListDto);

                    #region/* Emergency  Procedures */ 
                    var question2 = new Question { MainHeadingId = checklist.HeadingId, CheckListId = checklist.Id,
                        Content = "⦁  1st Alarm,warning alarm – Wait for further instruction.", HeaderText = "In the event of fire emergency" };
                    await service.CreateQuestion(question2);

                    var question3 = new Question { MainHeadingId = checklist.HeadingId, CheckListId = checklist.Id,
                        Content = "⦁	  2nd Alarm, evacuation alarm – Proceed to assembly area in an orderly manner.",
                    FooterText = "Note: Do not re-enter the premises or take the lift."};
                    await service.CreateQuestion(question3);
                    #endregion

                    #region/* Company policies  */
                    var heading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.MainHeading, Content = "Company policies" };
                    var headingResult = await service.AddHeading(heading);

                    var question5 = new Question { MainHeadingId = headingResult.Id, CheckListId = checklist.Id,
                        Content = "Quality and performance policy." };
                    await service.CreateQuestion(question5);

                    var question6 = new Question { MainHeadingId = headingResult.Id, CheckListId = checklist.Id,
                        Content = "Health, safety and environment policy." };
                    await service.CreateQuestion(question6);

                     var question7 = new Question { MainHeadingId = headingResult.Id, CheckListId = checklist.Id,
                        Content = "Alcohol and substance abuse policy." };
                    await service.CreateQuestion(question7);

                     var question8 = new Question { MainHeadingId = headingResult.Id, CheckListId = checklist.Id,
                        Content = "Security policy." };
                    await service.CreateQuestion(question8);
                    #endregion

                    #region/* Associated Hazards - headings   */
                    var hazardHeading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.MainHeading, Content = "Associated Hazards" };
                    var hazardResult = await service.AddHeading(hazardHeading);

                    var generalHeading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.SubHeading, Content = "General Hazard" };
                    var generalResult = await service.AddHeading(generalHeading);

                    var specificHeading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.SubHeading, Content = "Site Specific Hazards or Concern" };
                    var specificResult = await service.AddHeading(specificHeading);

                    var healthHeading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.SubOfSubHeading, Content = "Health and Safety hazards" };
                    var healtResult = await service.AddHeading(healthHeading);

                    var warehouseHeading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.SubOfSubHeading, Content = "Warehouse" };
                    var warehouseResult = await service.AddHeading(warehouseHeading);

                    var bayHeading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.SubOfSubHeading, Content = "Loading bay" };
                    var bayResult = await service.AddHeading(bayHeading);
                    #endregion

                    #region /*  Health and Safety hazards  */
                    var question9 = new Question { MainHeadingId = hazardResult.Id, CheckListId = checklist.Id, SubHeadingId = generalResult.Id, 
                        SubOfSubHeadingId = healtResult.Id, Content = "Electrical hazards." };
                    await service.CreateQuestion(question9);

                    var question10 = new Question { MainHeadingId = hazardResult.Id, CheckListId = checklist.Id, SubHeadingId = generalResult.Id, 
                        SubOfSubHeadingId = healtResult.Id, Content = "Fire hazards." };
                    await service.CreateQuestion(question10);

                    var question11 = new Question { MainHeadingId = hazardResult.Id, CheckListId = checklist.Id, SubHeadingId = generalResult.Id, 
                        SubOfSubHeadingId = healtResult.Id, Content = "Mechanical hazards." };
                    await service.CreateQuestion(question11);

                    var question12 = new Question { MainHeadingId = hazardResult.Id, CheckListId = checklist.Id, SubHeadingId = generalResult.Id, 
                        SubOfSubHeadingId = healtResult.Id, Content = "Falls from height/Falling objects." };
                    await service.CreateQuestion(question12);

                    var question13 = new Question { MainHeadingId = hazardResult.Id, CheckListId = checklist.Id, SubHeadingId = generalResult.Id, 
                        SubOfSubHeadingId = healtResult.Id, Content = "Ergonomic hazards (manual handling hazards)." };
                    await service.CreateQuestion(question13);

                    var question14 = new Question { MainHeadingId = hazardResult.Id, CheckListId = checklist.Id, SubHeadingId = generalResult.Id, 
                        SubOfSubHeadingId = healtResult.Id, Content = "Slip, trip and fall." };
                    await service.CreateQuestion(question14);

                    var question15 = new Question { MainHeadingId = hazardResult.Id, CheckListId = checklist.Id, SubHeadingId = generalResult.Id, 
                        SubOfSubHeadingId = healtResult.Id, Content = "Chemical hazards." };
                    await service.CreateQuestion(question15);
                    #endregion

                    #region /*  Warehouse  */
                    var question16 = new Question { MainHeadingId = hazardResult.Id, CheckListId = checklist.Id, SubHeadingId = specificResult.Id, 
                        SubOfSubHeadingId = warehouseResult.Id, Content = "Forklift & MHE movement." };
                    await service.CreateQuestion(question16);

                    var question17 = new Question {  MainHeadingId = hazardResult.Id, CheckListId = checklist.Id, SubHeadingId = specificResult.Id, 
                        SubOfSubHeadingId = warehouseResult.Id, Content = "Charging of Forklift and MHE." };
                    await service.CreateQuestion(question17);

                    var question18 = new Question {  MainHeadingId = hazardResult.Id, CheckListId = checklist.Id, SubHeadingId = specificResult.Id, 
                        SubOfSubHeadingId = warehouseResult.Id, Content = "Housekeeping." };
                    await service.CreateQuestion(question18);

                    var question19 = new Question {  MainHeadingId = hazardResult.Id, CheckListId = checklist.Id, SubHeadingId = specificResult.Id, 
                        SubOfSubHeadingId = warehouseResult.Id, Content = "Charging of micro-battery." };
                    await service.CreateQuestion(question19);
                    #endregion

                    #region /*  Loading bay  */
                    var question20 = new Question { MainHeadingId = hazardResult.Id, CheckListId = checklist.Id, SubHeadingId = specificResult.Id, 
                        SubOfSubHeadingId = bayResult.Id, Content = "Trip and fall over dock leveler." };
                    await service.CreateQuestion(question20);

                    var question21 = new Question {  MainHeadingId = hazardResult.Id, CheckListId = checklist.Id, SubHeadingId = specificResult.Id, 
                        SubOfSubHeadingId = bayResult.Id, Content = "Loading and unloading hazards." };
                    await service.CreateQuestion(question21);
                    #endregion

                    #region Risk Assessment
                    var riskHeading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.MainHeading, Content = "Risk Assessment" };
                    var riskResult = await service.AddHeading(riskHeading);

                    var question22 = new Question {  MainHeadingId = riskHeading.Id, CheckListId = checklist.Id,
                        Content = "Understand hazard identification, risk evaluation and control measures." };
                    await service.CreateQuestion(question22);
                    #endregion

                    #region General Security, Health and Safety Rules
                    var securityHeading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.MainHeading, Content = "General Security, Health and Safety Rules" };
                    var securityResult = await service.AddHeading(securityHeading);

                    var question23 = new Question {  MainHeadingId = securityResult.Id, CheckListId = checklist.Id,
                        Content = "No obstruction of Fire Fighting equipment, Emergency Exit/ stairway and Fireman Access point." };
                    await service.CreateQuestion(question23);

                    var question24 = new Question {  MainHeadingId = securityResult.Id, CheckListId = checklist.Id,
                        Content = "No smoking in the warehouse and office area." };
                    await service.CreateQuestion(question24);

                     var question25 = new Question {  MainHeadingId = securityResult.Id, CheckListId = checklist.Id,
                        Content = "No operating of forklift without valid forklift license." };
                    await service.CreateQuestion(question25);

                     var question26 = new Question {  MainHeadingId = securityResult.Id, CheckListId = checklist.Id,
                        Content = "Always observe warning signs and notices." };
                    await service.CreateQuestion(question26);

                     var question27 = new Question {  MainHeadingId = securityResult.Id, CheckListId = checklist.Id,
                        Content = "Comply with good housekeeping and hygiene habits." };
                    await service.CreateQuestion(question27);

                     var question28 = new Question {  MainHeadingId = securityResult.Id, CheckListId = checklist.Id,
                        Content = "Report all accident, injuries or near miss to your supervisor or manager." };
                    await service.CreateQuestion(question28);

                     var question29 = new Question {  MainHeadingId = securityResult.Id, CheckListId = checklist.Id,
                        Content = "After any injuries, consult first aiders immediately. If required, visit the doctor with your immediate supervisor." };
                    await service.CreateQuestion(question29);

                     var question30 = new Question {  MainHeadingId = securityResult.Id, CheckListId = checklist.Id,
                        Content = "No entry into quarantine or unauthorized area without the escort from host." };
                    await service.CreateQuestion(question30);
                    #endregion

                    #region Environmental Rules
                    var environmentHeading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.MainHeading, Content = "Environmental Rules" };
                    var environmentResult = await service.AddHeading(environmentHeading);

                    var question31 = new Question {  MainHeadingId = environmentResult.Id, CheckListId = checklist.Id,
                        Content = "Minimizing the environmental impact to our facility by reducing the consumption of natural resources, and the generation of waste and emissions related to the project, and practicing water conservation. " };
                    await service.CreateQuestion(question31);

                    var question32 = new Question {  MainHeadingId = environmentResult.Id, CheckListId = checklist.Id,
                        Content = "Switch off vehicle engine when doing loading and unloading to reduce pollution." };
                    await service.CreateQuestion(question32);

                    var question33 = new Question {  MainHeadingId = environmentResult.Id, CheckListId = checklist.Id,
                        Content = "Comply with 3 Rs practice. (Reduce, Reuse & Recycle)." };
                    await service.CreateQuestion(question33);
                    #endregion
                                        
                    #region Schedule of PPE in warehouse
                    var scheduleHeading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.MainHeading, Content = "Schedule of PPE in warehouse" };
                    var scheduleResult = await service.AddHeading(scheduleHeading);

                    var mandatoryHeading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.SubHeading, Content = "Mandatory" };
                    var mandatoryResult = await service.AddHeading(mandatoryHeading);

                    var ifHeading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.SubHeading, Content = "If applicable" };
                    var ifResult = await service.AddHeading(ifHeading);

                    var question34 = new Question { MainHeadingId = scheduleResult.Id, CheckListId = checklist.Id, SubHeadingId = mandatoryResult.Id,
                        Content = "Safety boots" };
                    await service.CreateQuestion(question34);

                    var question35 = new Question { MainHeadingId = scheduleResult.Id, CheckListId = checklist.Id, SubHeadingId = mandatoryResult.Id,
                        Content = "Visibility Vest/ Bolloré Uniform" };
                    await service.CreateQuestion(question35);
                    
                     var question36 = new Question { MainHeadingId = scheduleResult.Id, CheckListId = checklist.Id, SubHeadingId = ifResult.Id,
                        Content = "Gloves" };
                    await service.CreateQuestion(question36);
                    #endregion

                    #region/* Legal Requirement  */
                    var legalHeading = new Heading { CheckListId = checkListDto.Id, HeadingType = HeadingType.MainHeading, Content = "Legal Requirement" };
                    var legalHeadingResult = await service.AddHeading(legalHeading);

                    var question37 = new Question { MainHeadingId = legalHeadingResult.Id, CheckListId = checklist.Id,
                        Content = "The main legal requirements that were complied (Fire Safety Act, Workplace Safety & Health act, Environmental Protection & Management Act)."
                    };
                    await service.CreateQuestion(question37);

                    
                    #endregion

                }
            }
            catch(Exception ex)
            {
                logger.LogError("Error in checklist seed: ", ex);
            }

        }


    }
}
