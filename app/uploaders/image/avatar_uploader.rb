class Image::AvatarUploader < ImageUploader
  version :thumb do
    process resize_and_pad: [150, 200]
  end

  version :small do
    process resize_and_pad: [100, 100]
  end

  # version :normal do
  #   process resize_to_fit_by_percentage: 0.75
  # end

  def filename
    "#{mounted_as}.#{file.extension}" if file
  end

  def store_dir
    "uploads/user/#{get_file_type}/#{model.id}"
  end

  def default_url(*args)
    ActionController::Base.helpers.asset_path([version_name, 'no_avatar.png'].compact.join('_'))
  end

  def content_type_whitelist
    /image\//
  end

  def extension_whitelist
    %w(jpg jpeg gif png)
  end
end
