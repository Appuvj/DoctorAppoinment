namespace DoctorAppoitmentAPICRUD.Models
{
    public interface IDoctorRepository
    {
        Task<IEnumerable<Doctor>> GetAllAsync();
        Task<Doctor> GetByIdAsync(int id);
        Task<Doctor> UpdateAsync(Doctor doctor);
        Task<bool> DeleteAsync(int id);
        Task<Doctor> AddAsync(Doctor doctor); // Add this method

    }
}
