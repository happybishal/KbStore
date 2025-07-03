from django.shortcuts import render
from .models import Product, Category

def product_list(request):
    raw_products = Product.objects.values(
        'id', 'name', 'price', 'description', 'category__slug'
    )

    # 🔁 Convert Decimal to float manually
    products = [
        {
            **p,
            'price': float(p['price'])  # ✅ convert Decimal to float
        }
        for p in raw_products
    ]

    categories = Category.objects.all()

    return render(request, 'store/product_list.html', {
        'products': products,
        'categories': categories
    })
