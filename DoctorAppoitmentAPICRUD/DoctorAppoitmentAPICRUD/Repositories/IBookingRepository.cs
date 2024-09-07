using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;
using Microsoft.AspNetCore.Mvc;

namespace DoctorAppoitmentAPICRUD.Repositories
{
    public interface IBookingRepository
    {
        Task<IEnumerable<BookingGetDto>> GetAllAsync();
        Task<BookingGetDto> GetByIdAsync(int id);
        Task<Booking> AddAsync(BookingPostDto bookingPostDto);
        Task<Booking> UpdateAsync(BookingDto bookingDto, int id);
        Task<bool> DeleteAsync(int id);

        Task<ActionResult<IEnumerable<object>>> GetMedicalHistory(int id);
    }
}
