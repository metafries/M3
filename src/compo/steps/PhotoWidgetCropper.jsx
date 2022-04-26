import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function PhotoWidgetCropper({
    setImage,
    setPreview,
    imagePreview,
}) {
    const cropperRef = useRef(null);
    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        console.log(cropper.getCroppedCanvas().toDataURL());
        if (typeof cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        cropper.getCroppedCanvas().toBlob(blob => {
            setImage(blob);
            setPreview(URL.createObjectURL(blob))
        }, 'image/jpeg');
    };

    return (
        <Cropper
            src={imagePreview}
            aspectRatio={1}
            guides={false}
            viewMode={1}
            dragMode='move'
            scalable={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
            crop={onCrop}
            ref={cropperRef}
        />
    )
}
