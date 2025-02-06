using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System.Reflection;

namespace ruslet_calc
{
    public static class Calc
    {
    
        public static MemoryStream ExportExcel(double snowPressure, double windPressure, double temperatureWarm, double temperatureCold)
        {
            var fs = new MemoryStream();
            string ExcelFileName = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "Templates\\template.xlsx");
            if (!File.Exists(ExcelFileName))
            {
                Console.WriteLine("не найден файл"); 
                return fs; 
            }

            XSSFWorkbook workbook;
            using (FileStream file = new FileStream(ExcelFileName, FileMode.Open, FileAccess.Read))
            {
                workbook = new XSSFWorkbook(file);
            }

            ISheet sheet = workbook.GetSheetAt(0);

            sheet.GetRow(2).GetCell(6).SetCellValue(windPressure);
            sheet.GetRow(5).GetCell(6).SetCellValue(snowPressure);
            sheet.GetRow(8).GetCell(6).SetCellValue(temperatureCold);
            sheet.GetRow(9).GetCell(6).SetCellValue(temperatureWarm);

            workbook.Write(fs, true);
            return fs;
        }
    }
}
