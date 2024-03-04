import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import wasted_food from '../assets/wasted_food.png';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [donateListings, setDonateListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchDonateListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDonateListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=donate&limit=4');
        const data = await res.json();
        setDonateListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-2 p-16 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Share <span className='text-slate-500'>Your Food</span>
          <br />
       
        </h1>
        <div>
       <div className='text-gray-400 text-xl sm:text-sm'>Share Your Food, Share Your Community!</div> 
          <br />
          <div class="flex flex-wrap">
  <div class="w-full md:w-1/2 p-12 text-xl">
    Every year, <span class="text-red-500">1.3 billion tons</span> of food is wasted globally. That's one-third of all the food produced for human consumption.
  </div>
  <div class="w-full md:w-1/2 p-12 text-xl">
    At the same time, <span class="text-red-500">828 million</span> people do not have enough to eat. That's 1 in 10 people on the planet.
    Food waste is a major contributor to hunger and food insecurity. It also has a significant impact on the environment.
  </div>
  <div class="w-full md:w-1/2">
    <img src="src/assets/wasted_food.png" class="mx-auto" />
  </div>
  <div class="w-full md:w-1/2">
    <img src="src/assets/hunger.webp" class="mx-auto" />
  </div>
  <div class="hidden md:flex flex-1">
    <img src="src/assets/wasted_food.png" class="w-1/2" />
  </div>
  <div class="hidden md:flex flex-1">
    <img src="src/assets/hunger.webp" class="w-1/2" />
  </div>
</div>
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>
    
      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and donate **/}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {donateListings && donateListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent food for donation</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=donate'}>Show more places for free food</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {donateListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent food for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more food for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
