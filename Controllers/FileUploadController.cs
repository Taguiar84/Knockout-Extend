using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Script.Serialization;


namespace WebClient.Controllers
{
    /*
    public class FileUploadController : ApiController
    {
        private readonly JavaScriptSerializer _js = new JavaScriptSerializer { MaxJsonLength = 41943040 };
        private readonly string _storageRoot = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["FileUploadPath"]);

        public bool _isReusable { get { return false; } }


        public HttpResponseMessage Delete()
        {
            //var repository = Poligono.Core.NinjectBase.GetTempRepository();
            //var filePath = Path.Combine(repository.BasePath, HttpContext.Current.Request["f"]);
            
            var filePath = Path.Combine(_storageRoot, HttpContext.Current.Request["f"]);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
            return ControllerContext.Request.CreateResponse(HttpStatusCode.OK, "");
        }

        public HttpResponseMessage Post()
        {
            return UploadFile(HttpContext.Current);
        }

        public HttpResponseMessage Put()
        {            
            return UploadFile(HttpContext.Current);
        }


        private HttpResponseMessage UploadFile(HttpContext context)
        {
            var statuses = new List<FilesStatus>();
            var headers = context.Request.Headers;

            if (string.IsNullOrEmpty(headers["X-File-Name"]))
            {
                UploadWholeFile(context, statuses);
            }
            else
            {
                UploadPartialFile(headers["X-File-Name"], context, statuses);
            }

            return WriteJsonIframeSafe(context, statuses);
        }

        private HttpResponseMessage WriteJsonIframeSafe(HttpContext context, List<FilesStatus> statuses)
        {
            context.Response.AddHeader("Vary", "Accept");

            var json = new
            {
                files = statuses.ToArray()
            };

            var response = new HttpResponseMessage()
            {
                Content = new StringContent(_js.Serialize(json))
            };
            if (context.Request["HTTP_ACCEPT"].Contains("application/json"))
            {
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            }
            else
            {
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/plain");
            }
            return response;
        }

        // Upload partial file
        private void UploadPartialFile(string fileName, HttpContext context, List<FilesStatus> statuses)
        {
            if (context.Request.Files.Count != 1) throw new HttpRequestValidationException("Attempt to upload chunked file containing more than one fragment per request");
            var inputStream = context.Request.Files[0].InputStream;
            var fileSplit = fileName.Split('.');
            string ext = null;
            if (fileSplit.Length > 0 && fileSplit[fileSplit.Length - 1].Length <= 4)//have extension
            {
                ext = "." + fileSplit[fileSplit.Length - 1];
            }
            //var repository = Poligono.Core.NinjectBase.GetTempRepository();
            //var newName = repository.WriteFile(inputStream, ext);
            //var fullName = Path.Combine(repository.BasePath, newName);
            //statuses.Add(new FilesStatus(new FileInfo(fullName), fileName));
        }

        // Upload entire file
        private void UploadWholeFile(HttpContext context, List<FilesStatus> statuses)
        {
            //var repository = Poligono.Core.NinjectBase.GetTempRepository();
            for (int i = 0; i < context.Request.Files.Count; i++)
            {
                var file = context.Request.Files[i];
                var inputStream = context.Request.Files[0].InputStream;                
                var fileSplit = file.FileName.Split('.');
                string ext = null;
                if (fileSplit.Length > 0 && fileSplit[fileSplit.Length - 1].Length <= 4)//have extension
                {
                    ext = "." + fileSplit[fileSplit.Length - 1];
                }
                //var newName = repository.WriteFile(file.InputStream, ext);
                //var fullName = Path.Combine(repository.BasePath, newName);
                //statuses.Add(new FilesStatus(new FileInfo(fullName), file.FileName));
            }
        }
    }
    */
    #region FileStatus
    public class FilesStatus
    {
        //public const string HandlerPath = "/";

        public string group { get; set; }
        public string name { get; set; }
        public string displayName { get; set; }
        public string type { get; set; }
        public int size { get; set; }
        public string progress { get; set; }
        public string url { get; set; }
        public string thumbnail_url { get; set; }
        public string delete_url { get; set; }
        public string delete_type { get; set; }
        public string error { get; set; }

        public FilesStatus()
        {
        }

        public FilesStatus(FileInfo fileInfo, string displayName = null)
        {
            SetValues(fileInfo.Name, (int)fileInfo.Length, fileInfo.FullName);
            if (displayName != null)
                this.displayName = displayName;
        }

        public FilesStatus(string fileName, int fileLength, string fullPath)
        {
            SetValues(fileName, fileLength, fullPath);
        }

        private void SetValues(string fileName, int fileLength, string fullPath)
        {
            name = fileName;
            type = "image/png";
            size = fileLength;
            progress = "1.0";
            url = "FileUpload?f=" + fileName;
            delete_url = "FileUpload?f=" + fileName;
            delete_type = "DELETE";
            var ext = Path.GetExtension(fullPath);
            var fileSize = ConvertBytesToMegabytes(new FileInfo(fullPath).Length);
            if (fileSize > 3 || !IsImage(ext))
            {
                thumbnail_url = "/Content/img/generalFile.png";
            }
            else
            {
                thumbnail_url = @"data:image/png;base64," + EncodeFile(fullPath);
            }
        }

        private bool IsImage(string ext)
        {
            return ext == ".gif" || ext == ".jpg" || ext == ".png";
        }

        private string EncodeFile(string fileName)
        {
            byte[] bytes;
            using (Image image = Image.FromFile(fileName))
            {
                var ratioX = (double)80 / image.Width;
                var ratioY = (double)80 / image.Height;
                var ratio = Math.Min(ratioX, ratioY);
                var newWidth = (int)(image.Width * ratio);
                var newHeight = (int)(image.Height * ratio);
                var newImage = new Bitmap(newWidth, newHeight);
                Graphics.FromImage(newImage).DrawImage(image, 0, 0, newWidth, newHeight);
                ImageConverter converter = new ImageConverter();
                bytes = (byte[])converter.ConvertTo(newImage, typeof(byte[]));
                newImage.Dispose();
            }
            return Convert.ToBase64String(bytes);
        }

        private static double ConvertBytesToMegabytes(long bytes)
        {
            return (bytes / 1024f) / 1024f;
        }
    }
    #endregion
}
