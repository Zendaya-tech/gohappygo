import React from "react";

interface ActionCardProps {
  id: string | number;
  image: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  flightNumber: string;
  weight: number;
  price: string | number;
  priceSubtext?: string; // e.g., "€/Kg"
  user?: {
    name: string;
    avatar: string;
  };
  // Action Slots
  primaryAction?: {
    label: string;
    onClick: () => void;
    color?: "blue" | "green";
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    color?: "red" | "outline";
  };
  statusBadge?: string;
  messageAction?: {
    label: string;
    onClick: () => void;
  };
}

const ActionCard: React.FC<ActionCardProps> = ({
  image,
  title,
  subtitle,
  dateLabel,
  flightNumber,
  weight,
  price,
  priceSubtext,
  user,
  primaryAction,
  secondaryAction,
  statusBadge,
  messageAction,
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-5 shadow-sm w-full transition-all hover:shadow-md">
      {/* 1. Main Visual (Image or Logo) */}
      <div className="bg-gray-50 rounded-[2rem] aspect-square flex items-center justify-center p-6 mb-5 overflow-hidden">
        <img
          src={image || "/favicon.ico"}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => (e.currentTarget.src = "/favicon.ico")}
        />
      </div>

      {/* 2. User Row (If provided) */}
      {user && (
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover bg-gray-100"
            />
            <span className="font-bold text-gray-800 text-sm">{user.name}</span>
          </div>
          <button
            className="px-5 py-2 border-2 border-blue-600 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50"
            onClick={messageAction?.onClick}
          >
            Message
          </button>
        </div>
      )}

      {/* 3. Text Info */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-black text-gray-900 leading-tight">
          {title}
        </h3>

        <div className="flex flex-col gap-1">
          <div className="text-blue-600 font-extrabold text-sm">
            {subtitle}: <span className="ml-1">{weight} kg</span>
          </div>
          <div className="flex justify-between text-[0.7rem] text-gray-400 font-bold uppercase tracking-wider">
            <span>{dateLabel}</span>
            <span>Vol {flightNumber}</span>
          </div>
        </div>
      </div>

      {/* 4. Footer - Price & Dynamic Actions */}
      <div className="flex items-center justify-between mt-auto">
        <div className="text-md font-black text-gray-900">
          {price} {priceSubtext || "$"}
        </div>

        <div className="flex gap-2">
          {statusBadge ? (
            <span className="px-6 py-2 bg-green-50 text-green-600 rounded-xl font-bold text-xs">
              {statusBadge}
            </span>
          ) : (
            <>
              {primaryAction && (
                <button
                  onClick={primaryAction.onClick}
                  className={`px-4 py-2 text-white rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95 ${
                    primaryAction.color === "green"
                      ? "bg-green-500 shadow-green-100"
                      : "bg-blue-600 shadow-blue-100"
                  }`}
                >
                  {primaryAction.label}
                </button>
              )}
              {secondaryAction && (
                <button
                  onClick={secondaryAction.onClick}
                  className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors border-2 border-red-500 ${
                    secondaryAction.color === "red"
                      ? "text-red-500 hover:bg-red-50"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {secondaryAction.label}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionCard;
