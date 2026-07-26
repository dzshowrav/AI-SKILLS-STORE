# Image Generation Examples

## Basic Image Generation
```json
{
  "name": "generate_image",
  "arguments": {
    "prompt": "A clean, modern login page with a gradient background and centered form",
    "name": "login_page_mockup",
    "aspectRatio": "16:9"
  }
}
```

## Image with Reference Images
```json
{
  "name": "generate_image",
  "arguments": {
    "prompt": "Create a dashboard widget showing real-time metrics with the same color scheme as the reference",
    "name": "dashboard_widget",
    "referenceImages": [
      "/home/user/project/screenshots/current_design.png",
      "/home/user/project/screenshots/color_palette.png"
    ],
    "aspectRatio": "4:3"
  }
}
```

## Image with Mask
```json
{
  "name": "generate_image",
  "arguments": {
    "prompt": "Replace the background with a modern office environment",
    "name": "product_photo_edit",
    "referenceImages": ["/home/user/product_photo.png"],
    "mask": {
      "image": "/home/user/product_mask.png"
    }
  }
}
```

## Square Image for Avatar
```json
{
  "name": "generate_image",
  "arguments": {
    "prompt": "A professional headshot style avatar with a blurred tech background",
    "name": "user_avatar",
    "aspectRatio": "1:1"
  }
}
```

## Browser Screenshot + Save as Artifact
```json
{
  "name": "browser_capture_screenshot",
  "arguments": {
    "pageId": "page-1",
    "name": "login_page_error",
    "extendedScreenshot": true,
    "saveAsArtifact": true
  }
}
```
