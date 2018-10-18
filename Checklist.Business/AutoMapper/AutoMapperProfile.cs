
using AutoMapper;
using Checklist.Data.Entities;
using Checklist.WebApi.Dtos;

namespace Checklist.Business.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}