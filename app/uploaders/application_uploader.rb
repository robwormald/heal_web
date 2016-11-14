class ApplicationUploader < CarrierWave::Uploader::Base
  storage :file
  # storage :fog
end
