import React, { useState } from 'react';
import { MenuItem } from '../../types';
import { useCanteen } from '../../context/CanteenContext';
import { Clock, Star, Plus, Check, Flame } from 'lucide-react';

interface FoodCardProps {
  item: MenuItem;
  compact?: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, compact = false }) => {
  const { addToCart } = useCanteen();
  const [imageFailed, setImageFailed] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 900);
  };

  const isAvailable = item.available && item.remainingStock > 0;

  return (
    <div className={`group bg-white rounded-2xl border border-[#EEEAE5] overflow-hidden transition-all duration-200 hover:shadow-md hover:border-[#F46B35]/40 flex flex-col ${
      compact ? 'p-3' : 'p-4'
    }`}>
      {/* Food Image Container */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 mb-3.5">
        {!imageFailed && item.image ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setImageFailed(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100/60 p-4 text-center">
            <Flame className="w-8 h-8 text-[#F46B35] mb-1" />
            <span className="text-xs font-semibold text-neutral-700">{item.name}</span>
          </div>
        )}

        {/* Veg / Non-veg badge */}
        <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm p-1 rounded-md shadow-sm border border-neutral-100 flex items-center justify-center">
          {item.type === 'veg' ? (
            <div className="w-3.5 h-3.5 border border-emerald-600 rounded-sm flex items-center justify-center p-0.5" title="Vegetarian">
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
            </div>
          ) : (
            <div className="w-3.5 h-3.5 border border-rose-700 rounded-sm flex items-center justify-center p-0.5" title="Non-Vegetarian">
              <div className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[7px] border-b-rose-700" />
            </div>
          )}
        </div>

        {/* Popular / Recommended / Out of stock tags */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end">
          {!isAvailable ? (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold tracking-tight bg-neutral-900/80 text-white backdrop-blur-sm">
              Sold Out
            </span>
          ) : item.popular ? (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#F46B35] text-white shadow-sm">
              Popular
            </span>
          ) : item.recommended ? (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#202124] text-white shadow-sm">
              Chef Pick
            </span>
          ) : null}
        </div>

        {/* Prep Time pill on bottom of image */}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[11px] font-medium flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span className="tabular-nums font-mono">{item.prepTimeMinutes}m</span>
        </div>
      </div>

      {/* Info Body */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-bold text-[#202124] text-base group-hover:text-[#F46B35] transition-colors line-clamp-1">
            {item.name}
          </h4>
        </div>

        <p className="text-xs text-neutral-500 line-clamp-2 mb-3 leading-relaxed flex-1">
          {item.description}
        </p>

        {/* Rating and Stock info */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-3.5 pb-2.5 border-b border-[#EEEAE5]/60">
          <div className="flex items-center gap-1 font-semibold text-neutral-800">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="tabular-nums font-mono">{item.rating}</span>
            <span className="text-[11px] text-neutral-400 font-normal">({item.reviewCount})</span>
          </div>
          
          <div className="text-[11px]">
            {isAvailable ? (
              <span className={item.remainingStock < 20 ? 'text-[#F3A712] font-semibold' : 'text-neutral-500'}>
                {item.remainingStock} left
              </span>
            ) : (
              <span className="text-[#E64B4B] font-semibold">Unavailable</span>
            )}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">Price</span>
            <span className="text-lg font-extrabold text-[#202124] tabular-nums font-mono">
              ₹{item.price}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={!isAvailable}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
              !isAvailable
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : isAddedRecently
                ? 'bg-[#16A36A] text-white'
                : 'bg-[#F46B35] text-white hover:bg-[#FF8A50]'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
