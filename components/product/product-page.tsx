"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/data/products";
import { BEST_SELLERS } from "@/data/best-sellers";
import {
    Truck,
    Shield,
    CheckCircle,
    User,
    MapPin,
    Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/fade-in";

interface ProductPageProps {
    product: Product;
}

const quantityOptions = [
    { id: 1, label: "1 lunette", quantity: 1, discount: 0 },
    { id: 2, label: "2 lunettes", quantity: 2, discount: 0.2, bestDeal: true },
    { id: 3, label: "3 lunettes", quantity: 3, discount: 0.3 },
];

// Tunisian Governorates
const tunisianGovernorates = [
    "Ariana",
    "Béja",
    "Ben Arous",
    "Bizerte",
    "Gabès",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kébili",
    "Kef",
    "Mahdia",
    "Manouba",
    "Médenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
];

export function ProductPage({ product }: ProductPageProps) {
    const [selectedQuantity, setSelectedQuantity] = React.useState(2);
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
    const [formData, setFormData] = React.useState({
        name: "",
        governorate: "",
        phone: "",
        address: "",
    });

    // Product images - using main image and creating variations
    // In a real app, this would come from product data
    const productImages = [
        product.image,
        product.image, // You can replace with actual image paths
        product.image,
        product.image,
    ];

    // Extract price number from string like "€420"
    const priceMatch = product.price.match(/[\d.]+/);
    const basePrice = priceMatch ? parseFloat(priceMatch[0]) : 420;
    const selectedOption = quantityOptions.find((q) => q.id === selectedQuantity);
    const totalPrice = basePrice * (selectedOption?.quantity || 1);
    const discount = selectedOption?.discount ?? 0;
    const discountedPrice = totalPrice * (1 - discount);

    const recommendedProducts = React.useMemo(() => {
        // Utiliser les best-sellers (avec couleurs, hover, etc.), en excluant le produit courant
        return BEST_SELLERS.filter((p) => !p.slug.endsWith(product.slug)).slice(0, 10);
    }, [product.slug]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleGovernorateChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            governorate: value,
        }));
    };

    const handlePurchase = () => {
        // Handle purchase logic here
        console.log("Purchase:", { product, quantity: selectedQuantity, formData });
    };

    return (
        <div className="mx-auto max-w-8xl px-4 md:px-8 py-16 md:py-20 space-y-16">
            <FadeIn className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
                {/* Left Column - Product Image */}
                <div className="space-y-5">
                    {/* Main Image */}
                    <div className="relative mx-auto aspect-square w-full max-w-[500px] border border-black/10 bg-white/70 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),transparent_60%)] backdrop-blur-xl shadow-[0_32px_120px_rgba(15,23,42,0.25)] overflow-hidden md:max-w-[460px] lg:max-w-[520px]">
                        <Image
                            src={productImages[selectedImageIndex]}
                            alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                            fill
                            className="object-cover transition-opacity duration-300"
                            priority
                        />
                    </div>

                    {/* Thumbnail Images */}
                    <div className="grid grid-cols-4 gap-2 w-full max-w-[400px] mx-auto">
                        {productImages.map((image, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedImageIndex(index)}
                                className={cn(
                                    "relative aspect-square overflow-hidden border border-black/10 bg-white/70 transition-all",
                                    selectedImageIndex === index
                                        ? "border-black bg-white"
                                        : "hover:border-black/40",
                                )}
                            >
                                <Image
                                    src={image}
                                    alt={`${product.name} thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column - Product Info */}
                <div className="space-y-6 md:pl-4 lg:pl-8">
                    {/* Limited Offer Alert */}
                    {/* <div className="flex items-center gap-2 rounded-lg bg-orange-50 px-4 py-2 text-orange-600">
                    <Flame className="h-4 w-4" />
                    <span className="text-sm font-medium">Hurry up, this offer is limited!</span>
                </div> */}

                    {/* Rating */}
                    {/* <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">10k reviews</p>
                </div> */}

                    {/* Product Name - Bigger */}
                    <div className="space-y-3">
                        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-amber-900/70">
                            Clevards Eyewear
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
                            {product.name}
                        </h1>
                    </div>

                    {/* Feature Badges with Icons */}
                    <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="gap-1">
                            <Truck color="orange" className="h-3 w-3" />
                            Free Shipping
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                            <Shield color="green" className="h-3 w-3" />
                            100% Satisfaction Guarantee
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                            <CheckCircle color="green" className="h-3 w-3" />
                            100% Quality Guarantee
                        </Badge>
                    </div>

                    {/* Price */}
                    {/* <div className="flex items-baseline gap-3 items-center">
                        <span className="text-2xl font-bold">{product.price}</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                            Save 30%
                        </Badge>
                    </div> */}

                    {/* Description (sans tabs) */}
                    <div className="space-y-6 mt-6">
                        {/* <div className="rounded-lg bg-slate-100 p-3">
                            <p className="text-sm text-gray-700">{product.description}</p>
                        </div> */}

                        {/* Quantity Selection */}
                        <div className="space-y-2">
                            <Label className="text-base font-medium ">Select your quantity</Label>
                            <div className="grid grid-cols-3 gap-2 mt-3">
                                {quantityOptions.map((option) => (
                                    <Card
                                        key={option.id}
                                        className={cn(
                                            "relative cursor-pointer transition-all hover:shadow-md",
                                            selectedQuantity === option.id
                                                ? "border-2 border-primary bg-primary/5"
                                                : "border border-gray-300",
                                        )}
                                        onClick={() => setSelectedQuantity(option.id)}
                                    >
                                        {option.bestDeal && (
                                            <Badge
                                                variant="outline"
                                                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-primary text-[8px] px-1.5 py-0.5 md:text-xs md:px-2 md:py-1 text-white"
                                            >
                                                <span className="md:hidden">Best</span>
                                                <span className="hidden md:inline">Best Deal</span>
                                            </Badge>
                                        )}
                                        <CardContent className="p-3">
                                            <div className="text-center">
                                                <p className="text-sm font-medium">{option.label}</p>
                                                {option.discount > 0 ? (
                                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                                        Vous économisez{" "}
                                                        <span className="font-semibold text-foreground">
                                                            {Math.round(option.discount * 100)}%
                                                        </span>
                                                    </p>
                                                ) : (
                                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                                        —
                                                    </p>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Total Price Section */}
                        <div className="border-2 border-primary/20 bg-primary/5 p-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">
                                    Prix Totale:
                                </span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-base text-gray-400 line-through">
                                        {totalPrice.toFixed(2)}
                                    </span>
                                    <span className="text-xl font-bold text-primary">
                                        {discountedPrice.toFixed(2)}{" "}
                                        <span className="text-sm text-gray-400 font-normal">
                                            TND
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Order Form */}
                        <div className="space-y-4 border border-black/10 bg-white/70 backdrop-blur-sm p-6">
                            <h3 className="text-lg font-semibold">
                                Informations de commande
                            </h3>

                            <div className="space-y-4">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Nom Complet
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                {/* Phone Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        Numéro de téléphone
                                    </Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address" className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Adresse de livraison
                                    </Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="Enter your delivery address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                {/* Governorate Field */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="governorate"
                                        className="flex items-center gap-2"
                                    >
                                        <MapPin className="h-4 w-4" />
                                        Ville
                                    </Label>
                                    <Select
                                        value={formData.governorate}
                                        onValueChange={handleGovernorateChange}
                                    >
                                        <SelectTrigger id="governorate">
                                            <SelectValue placeholder="Select your governorate" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tunisianGovernorates.map((governorate) => (
                                                <SelectItem key={governorate} value={governorate}>
                                                    {governorate}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>


                            </div>
                        </div>

                        {/* Purchase Button */}
                        <Button
                            size="lg"
                            className="w-full bg-primary py-4 text-sm md:text-base font-semibold tracking-[0.22em] uppercase"
                            onClick={handlePurchase}
                            disabled={
                                !formData.name ||
                                !formData.governorate ||
                                !formData.phone ||
                                !formData.address
                            }
                        >
                            Commander maintenant - {discountedPrice.toFixed(2)} TND
                        </Button>
                    </div>
                </div>
            </FadeIn>

            {/* Discover / Recommendations */}
            {recommendedProducts.length > 0 && (
                <FadeIn className="space-y-6">
                    <section className="space-y-4">
                        <div className="flex items-baseline ">
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-amber-900/70">
                                    Sélection complémentaire
                                </p>
                                <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
                                    Vous aimerez aussi
                                </h2>
                            </div>
                        </div>

                        <div className="flex flex-wrap  shrink-0 gap-4">
                            {recommendedProducts.map((p) => (
                                <div key={p.slug} className="bg-card">
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    </section>
                </FadeIn>
            )}
        </div>
    );
}