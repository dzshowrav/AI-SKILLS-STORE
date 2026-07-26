# Image Generation Tool Reference

## Step Type
```
CORTEX_STEP_TYPE_GENERATE_IMAGE
CortexStepGenerateImage
GenerateImageToolConfig
```

## Parameters
- `prompt` (string, required): The text prompt to generate an image for
- `name` (string, required): Name of the generated image to save. Max 3 words, lowercase_with_underscores. Example: `login_page_mockup`
- `aspectRatio` (string, optional): Aspect ratio for the generated image. Supported: `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `9:16`, `16:9`. Default: `1:1`
- `referenceImages` (array of strings, optional): Absolute paths to images for editing/combining/reference. Max 3.
- `mask` (object, optional): Input image mask for targeted generation. `ToolImageGenerationInputImageMaskParam`.

## Architecture
- `ImageGenerationClient` — dedicated client for image generation API
- `GetImageGenerationModelIds` — separate model selection
- `GetImageGenerationRequest` -> `GetImageGenerationResponse` — request/response

## Step Converter
```
GenerateImageStringConverter: GenerateImage is nil in step
```
Handles nil/empty generation states in trajectory steps.

## Image Handling
Generated images can be embedded in artifacts for user review.
