# Serializers 
These are the classes to convert Djanog model into Json format.
Example.
```
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
```

i. printing serializer itself returns a class
'''
print('serializer:', serializer)
UserSerializerWithToken(<User: samirshahi9882@gmail.com>):
    id = IntegerField(label='ID', read_only=True)
    _id = SerializerMethodField(read_only=True)
    username = CharField(help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, validators=[<django.contrib.auth.validators.UnicodeUsernameValidator object>, <UniqueValidator(queryset=User.objects.all())>])
    email = EmailField(allow_blank=True, label='Email address', max_length=254, required=False)
    name = SerializerMethodField(read_only=True)
    isAdmin = SerializerMethodField(read_only=True)
    token = SerializerMethodField(read_only=True)
    
ii. serializer.data is used to have access to serialized Django model data.
    
print('serialized data:', serializer.data)
serialized data: {
      'id': 3,
      '_id': 3, 
      'username': 'saara2@gmail.com', 
      'email': 'saara2@gmail.com', 
      'name': 'Saara', 
      'isAdmin': False, 
      'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0Nzg1NDYyLCJpYXQiOjE2NjIxOTM0NjIsImp0aSI6ImIxNzE1YzB
      hM2E1MzQ3ZTFhMTdlYmM4NjM5MzdhMzg1IiwidXNlcl9pZCI6M30.v7WcrI_vMmkWYV-NPDs_0GxZr7bM8E36w_5mHlcfTRI'
    }    
'''

## Signal Configuration
In settings.py, include .apps.MbaseConfig at the end
```
INSTALLED_APPS = [
    'Mbase.apps.MbaseConfig',
]
```

In apps.py
```
from django.apps import AppConfig
class MbaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Mbase'
    
    def ready(self):
        import Mbase.signals
```


# Authorization
  Authorization: `Bearer ${userInfo.token}`
  put this in every componenet that requies authentication like payment, checkout component.

# React 

For Data fetching from Django with axios
In package.json
```
  "proxy": "http://127.0.0.1:8000/",
```


## Working With URL Search Parameter | Query String in Url

Example 1.
<Route path="/cart/:id/*" element={<CartScreen />}></Route>  

const addToCartHandler=()=>{
    navigate(`/cart/${id}/?qty=${quantity}`)
}

i. Using URLSearchParam() object
-> detects querystring of only form ?qty=${quantity} in url
-> ?qty=${qty}&code=${code}&page=${page}

```
const params = new URLSearchParams(window.location.search);
const paramValue = params.get("qty");
console.log(paramValue)
```

ii. useParam() hook detects params of form :id in url
```
const {id} = useParams();
console.log(id)
```

iii. useSearchParams() hook
```
import {useParams, useSearchParams, } from 'react-router-dom'
const [searchParams, setSearchParams] = useSearchParams();
const quantity = searchParams.get("qty") || 0
console.log('qty:',quantity)
```

Example 2.
// matches /cart/, /cart/1, /cart/3/34
  <Route path="/cart/*" element={<CartScreen />}></Route>

  Cart Functionality
  On clicking add to cart button , it takes us to CartScreen Component which dispatch addtoCart function that resides in src/actions folder.
  We store items in local storage(checkout local storage in browser.) then display those items in /cart/.
