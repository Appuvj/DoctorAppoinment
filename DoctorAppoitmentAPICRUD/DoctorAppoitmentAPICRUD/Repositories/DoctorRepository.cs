using DoctorAppoitmentAPICRUD.Data;
using DoctorAppoitmentAPICRUD.Dtos;
using DoctorAppoitmentAPICRUD.Models;
using Microsoft.EntityFrameworkCore;

namespace DoctorAppoitmentAPICRUD.Repositories
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly HospitalContext _context;

        public DoctorRepository(HospitalContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Doctor>> GetAllAsync()
        {
            return await _context.Doctors.Include(d => d.Bookings).ToListAsync();
        }

        public async Task<DoctorGetById> GetByIdAsync(int id)
        {
            var doctor = await _context.Doctors
         .Include(d => d.Bookings)
         .ThenInclude(b => b.Patient) // Include related Patient for each booking
         .Where(d => d.DoctorId == id)
         .Select(d => new DoctorGetById
         {
             DoctorId = d.DoctorId,
             Name = d.Name,
             Specialization = d.Specialization,
             Contact = d.Contact,
             Bookings = d.Bookings.Select(b => new DoctorBookingDto
             {
                 BookingId = b.BookingId,
                 BookingDate = b.BookingDate,
                 PatientName = b.Patient != null ? b.Patient.Name : null // Get Patient name if available
             }).ToList()
         })
         .FirstOrDefaultAsync();

            return doctor;
        }

        public async Task<Doctor> AddAsync(DoctorDto doctorDto)
        {
            var doctor = new Doctor
            {
                Name = doctorDto.Name,
                Specialization = doctorDto.Specialization,
                Contact = doctorDto.Contact
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();
            return doctor;
        }

        public async Task<Doctor> UpdateAsync(DoctorDto doctorDto,int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            doctor.Name = doctorDto.Name;
            doctor.Specialization = doctorDto.Specialization;
            doctor.Contact = doctorDto.Contact;
            _context.Doctors.Update(doctor);
            await _context.SaveChangesAsync();
            return doctor;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return false;
            }

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
