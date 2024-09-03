﻿namespace DoctorAppoitmentAPICRUD.Models
{
    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> GetAllAsync();
        Task<Booking> GetByIdAsync(int id);
        Task<Booking> AddAsync(Booking booking);
        Task<Booking> UpdateAsync(Booking booking);
        Task<bool> DeleteAsync(int id);
    }
}
