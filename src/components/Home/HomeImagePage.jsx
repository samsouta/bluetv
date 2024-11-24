import React from 'react';
import TvLoader from '../Ui/TvLoader';
import { useGetPhotosQuery } from '../../services/api/PhotoApi';
import Swal from 'sweetalert2';
import { Card, CardFooter, CardHeader, Image } from '@nextui-org/react';
import LazyLoad from 'react-lazyload';
import Skeleton from 'react-loading-skeleton';
import { Button } from 'flowbite-react';

const HomeImagePage = () => {
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
       <div>
            <div className=" mt-16 px-2 flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 transition-all duration-300 ease-in-out">
                {/* Map over the 'photos' data that is fetched */}
                {photos?.map((item) => (
                    <Card key={item?.id} isFooterBlurred className="bg-transparent w-full h-[250px] sm:h-[300px] md:h-[300px] lg:h-[300px] overflow-hidden transition-all duration-300 ease-in-out">
                        <CardHeader className="absolute z-10 top-1 flex-col items-start">
                            <p className="text-tiny text-[#fbb0da] uppercase font-bold">New</p>
                        </CardHeader>
                        <LazyLoad
                        offset={100}
                        placeholder={<Skeleton style={{ height: '100%', width: '100%' }} />}  // Full viewport height for the skeleton
                        style={{ height: '100%', width: '100%' }}
                        >
                        <Image
                            removeWrapper
                            alt={item?.name || "Card example background"} // Use item's name or fallback text
                            className="z-0 w-full h-full scale-125 -translate-y-6 object-contain"
                            src={item?.url} // Use dynamic image URL
                        />
                        </LazyLoad>
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
    </div>
  );
}

export default HomeImagePage;
