using System.Text.Json;

namespace LafotHakfarBackend.Bakery.Infrastructure.FileStorage
{
    public class FileStorageService<T> where T : class
    {
        private readonly string _filePath;

        public FileStorageService(string filePath)
        {
            _filePath = filePath;
            if (!File.Exists(_filePath))
                File.WriteAllText(_filePath, "[]");
        }

        public List<T> ReadAll()
        {
            var data = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<T>>(data) ?? new List<T>();
        }

        public void WriteAll(List<T> items)
        {
            var json = JsonSerializer.Serialize(items, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, json);
        }

        public void AddItem(T item)
        {
            var items = ReadAll();
            items.Add(item);
            WriteAll(items);
        }
    }
}
