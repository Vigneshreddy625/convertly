# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [files, setFiles] = useState([]);

  const handleUpload = async (file) => {
    setFiles([file]);

    const startTime = Date.now();

    await axios.post("http://localhost:8000/upload", 
      (() => {
        const formData = new FormData();
        formData.append("file", file);
        return formData;
      })(), 
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (event) => {
          if (event.total) {
            const percent = (event.loaded / event.total) * 100;
            setProgress(percent.toFixed(2));

            const elapsed = (Date.now() - startTime) / 1000;
            const uploadSpeed = event.loaded / elapsed;
            setSpeed((uploadSpeed / 1024).toFixed(2)); // KB/s

            const remaining = event.total - event.loaded;
            const estimatedTimeLeft = remaining / uploadSpeed;
            setTimeLeft(estimatedTimeLeft.toFixed(0)); 
          }
        }
      }
    );
  };
