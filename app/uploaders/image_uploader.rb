class ImageUploader < ApplicationUploader
  include CarrierWave::MiniMagick
  process :validate_dimensions

  def get_file_type
    'image'
  end

  private

  def resize_to_fit_by_percentage(percentage)
    resize_to_fit get_width*percentage, nil
  end

  def get_width
    ::MiniMagick::Image.open(file.file)[:dimensions].first if file && model
  end

  def validate_dimensions
    manipulate! do |img|
      raise CarrierWave::ProcessingError, 'dimensions too large' if img.dimensions.any?{ |i| i > 8000 }
      img
    end
  end
end
