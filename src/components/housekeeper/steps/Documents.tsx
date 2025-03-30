import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

type DocumentsData = {
  photo: File | null;
  cv: File | null;
  certifications: File[];
};

type Props = {
  data: DocumentsData;
  onChange: (data: Partial<DocumentsData>) => void;
};

const Documents: React.FC<Props> = ({ data, onChange }) => {
  const photoRef = useRef<HTMLInputElement>(null);
  const cvRef = useRef<HTMLInputElement>(null);
  const certificationsRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof DocumentsData
  ) => {
    const files = event.target.files;
    if (!files) return;

    if (field === 'certifications') {
      onChange({ [field]: Array.from(files) });
    } else {
      onChange({ [field]: files[0] });
    }
  };

  const removeFile = (field: keyof DocumentsData, index?: number) => {
    if (field === 'certifications' && typeof index === 'number') {
      const newCertifications = [...data.certifications];
      newCertifications.splice(index, 1);
      onChange({ certifications: newCertifications });
    } else {
      onChange({ [field]: null });
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Upload className="w-8 h-8 text-primary mr-3" />
        <h2 className="text-2xl font-montserrat font-bold text-gray-800">
          Documents
        </h2>
      </div>

      <div className="space-y-6">
        {/* Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo de profil
          </label>
          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'photo')}
            className="hidden"
          />
          {data.photo ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{data.photo.name}</span>
              <button
                onClick={() => removeFile('photo')}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => photoRef.current?.click()}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors"
            >
              Choisir une photo
            </button>
          )}
        </div>

        {/* CV */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CV
          </label>
          <input
            ref={cvRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange(e, 'cv')}
            className="hidden"
          />
          {data.cv ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{data.cv.name}</span>
              <button
                onClick={() => removeFile('cv')}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => cvRef.current?.click()}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors"
            >
              Télécharger votre CV
            </button>
          )}
        </div>

        {/* Certifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Certifications
          </label>
          <input
            ref={certificationsRef}
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            multiple
            onChange={(e) => handleFileChange(e, 'certifications')}
            className="hidden"
          />
          <button
            onClick={() => certificationsRef.current?.click()}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors"
          >
            Ajouter des certifications
          </button>
          {data.certifications.length > 0 && (
            <div className="mt-3 space-y-2">
              {data.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{cert.name}</span>
                  <button
                    onClick={() => removeFile('certifications', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;