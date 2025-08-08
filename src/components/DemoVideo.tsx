import React, { useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Wallet, Coins, Image } from 'lucide-react'

const DemoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)

  const videoRef = React.useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setCurrentTime(0)
      if (!isPlaying) {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <section id="demo-video" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            See Our Platform In
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch a complete walkthrough of our Sui blockchain platform. See real wallet connections, 
            live transactions, and NFT minting in action.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md bg-white/10 border border-white/20">
          {/* Video Player */}
          <div 
            className="relative group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              poster="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
            >
              <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button
                  onClick={togglePlay}
                  className="group/play p-6 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <Play className="h-12 w-12 text-white ml-1 group-hover/play:scale-110 transition-transform" />
                </button>
              </div>
            )}

            {/* Blockchain Demo Overlay */}
            {!isPlaying && (
              <div className="absolute top-4 left-4 right-4">
                <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-4">
                  <h3 className="text-white font-semibold text-lg mb-2">🎬 Blockchain Platform Demo</h3>
                  <p className="text-white/90 text-sm">
                    Complete walkthrough: Wallet connection → Transaction sending → NFT minting
                  </p>
                </div>
              </div>
            )}

            {/* Video Controls */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 text-white" />
                    ) : (
                      <Play className="h-5 w-5 text-white ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={restartVideo}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4 text-white" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5 text-white" />
                    ) : (
                      <Volume2 className="h-5 w-5 text-white" />
                    )}
                  </button>

                  <span className="text-white text-sm font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Maximize className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Timeline */}
        <div className="mt-8 p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Demo Timeline</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/20">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">1</div>
              <div>
                <div className="font-medium text-gray-800">0:00 - 0:30</div>
                <div className="text-sm text-gray-600">Platform Overview</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/20">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">2</div>
              <div>
                <div className="font-medium text-gray-800">0:30 - 1:00</div>
                <div className="text-sm text-gray-600">Wallet Connection</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/20">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">3</div>
              <div>
                <div className="font-medium text-gray-800">1:00 - 1:30</div>
                <div className="text-sm text-gray-600">Send Transaction</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/20">
              <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm font-bold">4</div>
              <div>
                <div className="font-medium text-gray-800">1:30 - 2:00</div>
                <div className="text-sm text-gray-600">Mint NFT</div>
              </div>
            </div>
          </div>
        </div>

        {/* What You'll See */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Wallet Integration</h3>
            <p className="text-gray-600 text-sm">
              Watch how seamlessly users connect their Sui wallets and view their balance in real-time
            </p>
          </div>

          <div className="text-center p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
              <Coins className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Transactions</h3>
            <p className="text-gray-600 text-sm">
              See actual SUI tokens being sent with instant confirmations and transaction tracking
            </p>
          </div>

          <div className="text-center p-6 rounded-xl backdrop-blur-md bg-white/10 border border-white/20">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
              <Image className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">NFT Creation</h3>
            <p className="text-gray-600 text-sm">
              Experience the complete NFT minting process from upload to blockchain confirmation
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => document.getElementById('wallet')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl"
            >
              Try It Live Now
            </button>
            <button className="px-8 py-4 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-gray-700 font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg">
              View Source Code
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * Demo shows actual blockchain interactions on Sui testnet
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #3b82f6;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #3b82f6;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  )
}

export default DemoVideo
