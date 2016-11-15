class Image::AvatarUploader < ImageUploader
  include CarrierWave::MiniMagick

  def filename
    "#{mounted_as}.#{file.extension}"
  end

  def store_dir
    "uploads/user/#{get_file_type}/#{model.id}"
  end

  def default_url(*args)
    ActionController::Base.helpers.asset_path([version_name, 'no_avatar.png'].compact.join('_'))
  end

  process resize_to_fit: [200, 250]

  version :thumb do
    process resize_to_fill: [50, 50]
  end

  def content_type_whitelist
    /image\//
  end

  def extension_whitelist
    %w(jpg jpeg gif png)
  end
end
