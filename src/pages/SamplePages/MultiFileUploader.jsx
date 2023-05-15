import MultiFileUploadForm from '../../components/MultiFileUploadForm';
import { API_URL } from '../../constants/AppAPIConstants';

const MultiFileUploader = () => {
  document.title = 'Upload files';

  return (
    <MultiFileUploadForm
      endpoint={`${API_URL}/files`}
      pageHeading="Upload files"
      submitButtonLabel="Save and continue"
      urlNextPage="/next"
      urlThisPage="/this"
    />
  );
};

export default MultiFileUploader;
