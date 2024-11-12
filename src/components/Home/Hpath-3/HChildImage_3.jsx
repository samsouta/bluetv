import React from 'react';
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { useGetPhotosQuery } from '../../../services/api/PhotoApi'; // Import the query hook
import TvLoader from '../../loader/TvLoader';
import Swal from 'sweetalert2'; // Import SweetAlert2


const HChildImage_3 = () => {
    const { data: photos, error, isLoading } = useGetPhotosQuery(); // Use the query hook

    if (isLoading) return <TvLoader />; // Display loading state
    if (error) return <div>Error: {error.message}</div>; // Handle errors

    const handleDownload = (url, name) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to download this image: ${name}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, download it!',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'confirm-btn',
                cancelButton: 'cancel-btn',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // Start the download if the user confirms
                const link = document.createElement('a');
                link.href = url; // Set the URL for the image
                link.download = name || 'image'; // Set the name of the downloaded file
                link.style.display = 'none'; // Hide the link (it won’t be visible on the page)
                document.body.appendChild(link); // Append the link to the DOM
                link.click(); // Programmatically trigger the download
                document.body.removeChild(link); // Clean up by removing the link after clicking
        
                Swal.fire('Downloading!', 'Your image is being downloaded.', 'success'); // Success alert
            }
        });
        
        // Add these styles to your CSS file (or use inline styles if preferred)
        const style = document.createElement('style');
        style.innerHTML = `
            .confirm-btn {
                background-color: #fbb0da !important;
                color: white !important;
            }
            .cancel-btn {
                background-color: red !important;
                color: white !important;
            }
        `;
        document.head.appendChild(style);
    };

    return (
        <div>
            <div className="max-w-[900px] mt-16 gap-2 grid grid-cols-12 grid-rows-2 px-8">
                {/* Map over the 'photos' data that is fetched */}
                {photos?.map((item) => (
                    <Card key={item?.id} isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                        <CardHeader className="absolute z-10 top-1 flex-col items-start">
                            <p className="text-tiny text-[#fbb0da] uppercase font-bold">New</p>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt={item?.name || "Card example background"} // Use item's name or fallback text
                            className="z-0 w-full h-full scale-125 -translate-y-6 object-contain"
                            src={item?.url} // Use dynamic image URL
                        />
                        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                            <div>
                                {/* Optionally, add more content here */}
                            </div>
                            <Button 
                                className="text-tiny bg-[#fbb0da]" 
                                radius="full" 
                                size="sm"
                                onClick={() => handleDownload(item?.url, item?.name)} // Trigger download on button click
                            >
                                Download
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default HChildImage_3;
