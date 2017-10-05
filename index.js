'use strict'

const repertoires = [
  '89ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÆÐØÞßæðøþĐđĦħıĸŁłŊŋŒœŦŧƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƢƣƤƥƦƧƨƩƪƫƬƭƮƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǝǤǥǶǷȜȝȠȡȢȣȤȥȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯͰͱͲͳͶͷͻͼͽͿΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρςστυφχψωϏϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϳϷϸϺϻϼϽϾϿЂЄЅІЈЉЊЋЏАБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзиклмнопрстуфхцчшщъыьэюяђєѕіјљњћџѠѡѢѣѤѥѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵѸѹѺѻѼѽѾѿҀҁҊҋҌҍҎҏҐґҒғҔҕҖҗҘҙҚқҜҝҞҟҠҡҢңҤҥҦҧҨҩҪҫҬҭҮүҰұҲҳҴҵҶҷҸҹҺһҼҽҾҿӀӃӄӅӆӇӈӉӊӋӌӍӎӏӔӕӘәӠӡӨөӶӷӺӻӼӽӾӿԀԁԂԃԄԅԆԇԈԉԊԋԌԍԎԏԐԑԒԓԔԕԖԗԘԙԚԛԜԝԞԟԠԡԢԣԤԥԦԧԨԩԪԫԬԭԮԯԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖաբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆאבגדהוזחטיךכלםמןנסעףפץצקרשתװױײؠءابةتثجحخدذرزسشصضطظعغػؼؽؾؿفقكلمنهوىي٠١٢٣٤٥٦٧٨٩ٮٯٱٲٳٴٹٺٻټٽپٿڀځڂڃڄڅچڇڈډڊڋڌڍڎڏڐڑڒړڔڕږڗژڙښڛڜڝڞڟڠڡڢڣڤڥڦڧڨکڪګڬڭڮگڰڱڲڳڴڵڶڷڸڹںڻڼڽھڿہۃۄۅۆۇۈۉۊۋیۍێۏېۑےەۮۯ۰۱۲۳۴۵۶۷۸۹ۺۻۼۿܐܒܓܔܕܖܗܘܙܚܛܜܝܞܟܠܡܢܣܤܥܦܧܨܩܪܫܬܭܮܯݍݎݏݐݑݒݓݔݕݖݗݘݙݚݛݜݝݞݟݠݡݢݣݤݥݦݧݨݩݪݫݬݭݮݯݰݱݲݳݴݵݶݷݸݹݺݻݼݽݾݿހށނރބޅކއވމފދތލގޏސޑޒޓޔޕޖޗޘޙޚޛޜޝޞޟޠޡޢޣޤޥޱ߀߁߂߃߄߅߆߇߈߉ߊߋߌߍߎߏߐߑߒߓߔߕߖߗߘߙߚߛߜߝߞߟߠߡߢߣߤߥߦߧߨߩߪࠀࠁࠂࠃࠄࠅࠆࠇࠈࠉࠊࠋࠌࠍࠎࠏࠐࠑࠒࠓࠔࠕࡀࡁࡂࡃࡄࡅࡆࡇࡈࡉࡊࡋࡌࡍࡎࡏࡐࡑࡒࡓࡔࡕࡖࡗࡘࡠࡡࡢࡣࡤࡥࡦࡧࡨࡩࡪࢠࢡࢢࢣࢤࢥࢦࢧࢨࢩࢪࢫࢬࢭࢮࢯࢰࢱࢲࢳࢴࢶࢷࢸࢹࢺࢻࢼࢽऄअआइईउऊऋऌऍऎएऐऑऒओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलळवशषसहऽॐॠॡ०१२३४५६७८९ॲॳॴॵॶॷॸॹॺॻॼॽॾॿঀঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহঽৎৠৡ০১২৩৪৫৬৭৮৯ৰৱ৴৵৶৷৸৹ৼਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਵਸਹੜ੦੧੨੩੪੫੬੭੮੯ੲੳੴઅઆઇઈઉઊઋઌઍએઐઑઓઔકખગઘઙચછજઝઞટઠડઢણતથદધનપફબભમયરલળવશષસહઽૐૠૡ૦૧૨૩૪૫૬૭૮૯ૹଅଆଇଈଉଊଋଌଏଐଓଔକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନପଫବଭମଯରଲଳଵଶଷସହଽୟୠୡ୦୧୨୩୪୫୬୭୮୯ୱ୲୳୴୵୶୷ஃஅஆஇஈஉஊஎஏஐஒஓகஙசஜஞடணதநனபமயரறலளழவஶஷஸஹௐ௦௧௨௩௪௫௬௭௮௯௰௱௲అఆఇఈఉఊఋఌఎఏఐఒఓఔకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరఱలళఴవశషసహఽౘౙౚౠౡ౦౧౨౩౪౫౬౭౮౯౸౹౺౻౼౽౾ಀಅಆಇಈಉಊಋಌಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಱಲಳವಶಷಸಹಽೞೠೡ೦೧೨೩೪೫೬೭೮೯ೱೲഅആഇഈഉഊഋഌഎഏഐഒഓഔകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനഩപഫബഭമയരറലളഴവശഷസഹഺഽൎൔൕൖ൘൙൚൛൜൝൞ൟൠൡ൦൧൨൩൪൫൬൭൮൯൰൱൲൳൴൵൶൷൸ൺൻർൽൾൿඅආඇඈඉඊඋඌඍඎඏඐඑඒඓඔඕඖකඛගඝඞඟචඡජඣඤඥඦටඨඩඪණඬතථදධනඳපඵබභමඹයරලවශෂසහළෆ෦෧෨෩෪෫෬෭෮෯กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะาเแโใไๅ๐๑๒๓๔๕๖๗๘๙ກຂຄງຈຊຍດຕຖທນບປຜຝພຟມຢຣລວສຫອຮຯະາຽເແໂໃໄ໐໑໒໓໔໕໖໗໘໙ໞໟༀ༠༡༢༣༤༥༦༧༨༩༪༫༬༭༮༯༰༱༲༳ཀཁགངཅཆཇཉཊཋཌཎཏཐདནཔཕབམཙཚཛཝཞཟའཡརལཤཥསཧཨཪཫཬྈྉྊྋྌကခဂဃငစဆဇဈဉညဋဌဍဎဏတထဒဓနပဖဗဘမယရလဝသဟဠအဢဣဤဥဧဨဩဪဿ၀၁၂၃၄၅၆၇၈၉ၐၑၒၓၔၕ',
  '01234567'
]

const MAGIC_NUMBER_A = 11 // Base2048 is an 11-bit encoding
const MAGIC_NUMBER_B = 8  // Bits in a byte

const lookupEncode = {}
const lookupDecode = {}
repertoires.forEach(function (repertoire, r) {
  lookupEncode[r] = {}
  lookupDecode[r] = {}
  repertoire.split('').forEach(function (chr, k) {
    const codePoint = chr.charCodeAt(0) // All CPs are in the BMP which means we don't need String.prototype.codePointAt
    lookupEncode[r][k] = codePoint
    lookupDecode[r][codePoint] = k
  })
})

/**
  Input an array of {byte, numBits}. Output an array of bits.
*/
const sizedBytesToBits = function (sizedBytes) {
  const bits = []
  sizedBytes.forEach(function (sizedByte) {
    let byte = sizedByte.byte
    const numBits = sizedByte.numBits

    if (byte !== Number(byte)) {
      throw new Error('Not an number: ' + String(byte))
    }
    if (Math.floor(byte) !== byte) {
      throw new Error('Not an integer: ' + String(byte))
    }
    if (byte < 0 || (1 << numBits) <= byte) {
      throw new Error('Integer out of range: ' + String(byte))
    }

    // Take most significant bit first
    for (let i = numBits - 1; i >= 0; i--) {
      const bit = (byte & (1 << i)) >> i
      if (bit !== 0 && bit !== 1) {
        throw new Error('Not a bit: ' + String(bit))
      }
      bits.push(bit === 1)
      byte -= bit << i
    }

    if (byte !== 0) {
      throw new Error('Somehow did not consume all bits: ' + String(byte))
    }
  })
  return bits
}

/**
  Input an array of bits and a desired size. Output an array of {byte,
  numBits}. The latter will be the desired size except possibly for the
  final element in the array which will likely be smaller (but not zero)
*/
const bitsToSizedBytes = function (bits, size) {
  const sizedBytes = []
  let byte = 0
  let numBits = 0
  bits.forEach(function (bit, n) {
    byte = (byte << 1) + (bit ? 1 : 0)
    numBits++
    if (numBits === size || n === bits.length - 1) {
      sizedBytes.push({
        byte: byte,
        numBits: numBits
      })
      byte = 0
      numBits = 0
    }
  })
  return sizedBytes
}

module.exports = {
  encode: function (arrayBuffer) {
    const uint8Array = new Uint8Array(arrayBuffer)

    const uint8s = [...uint8Array.values()]

    const sizedBytes = uint8s.map(function (uint8) {
      return {
        byte: uint8,
        numBits: MAGIC_NUMBER_B
      }
    })

    const bits = sizedBytesToBits(sizedBytes)

    const resizedBytes = bitsToSizedBytes(bits, MAGIC_NUMBER_A)

    const ks = resizedBytes.map(function (sizedByte, i, arr) {
      let byte = sizedByte.byte
      let numBits = sizedByte.numBits

      // The final character requires special treatment.
      if (numBits !== MAGIC_NUMBER_A) {
        if (i !== arr.length - 1) {
          throw new Error('Incomplete byte found midway through stream')
        }

        // byte = bbbcccccccc, numBits = 11, padBits = 0
        // byte = bbcccccccc, numBits = 10, padBits = 1
        // byte = bcccccccc, numBits = 9, padBits = 2
        // byte = cccccccc, numBits = 8, padBits = 3
        // byte = ccccccc, numBits = 7, padBits = 4
        // byte = cccccc, numBits = 6, padBits = 5
        // byte = ccccc, numBits = 5, padBits = 6
        // byte = cccc, numBits = 4, padBits = 7
        // => Pad `byte` out to 11 bits using 1s, then encode as normal (repertoire 0)

        // byte = ccc, numBits = 3, padBits = 0
        // byte = cc, numBits = 2, padBits = 1
        // byte = c, numBits = 1, padBits = 2
        // => Pad `byte` out to 3 bits using 1s, then encode specially (repertoire 1)

        const padBits = (MAGIC_NUMBER_A - numBits) % MAGIC_NUMBER_B // 0 to 7
        byte = (byte << padBits) + ((1 << padBits) - 1)
        numBits += padBits // 11 or 3
      }

      const r = (MAGIC_NUMBER_A - numBits) / MAGIC_NUMBER_B // 0 or 1
      return {
        k: byte,
        r: r
      }
    })

    const codePoints = ks.map(function (pair) {
      const k = pair.k
      const r = pair.r

      if (!(r in lookupEncode)) {
        throw new Error('Unrecognised `r`: ' + String(r))
      }
      if (!(k in lookupEncode[r])) {
        throw new Error('Unrecognised `k`: ' + String(k))
      }

      return lookupEncode[r][k]
    })

    const chars = codePoints.map(function (codePoint) {
      return String.fromCharCode(codePoint)
    })

    const str = chars.join('')

    return str
  },

  decode: function (str) {
    const chars = str.split('')

    const codePoints = chars.map(ch => ch.charCodeAt(0))

    const ks = codePoints.map(function (codePoint) {
      for (let r = 0; r in lookupDecode; r++) {
        if (codePoint in lookupDecode[r]) {
          return {
            k: lookupDecode[r][codePoint],
            r: r
          }
        }
      }
      throw new Error('Unrecognised `codePoint`: ' + String(codePoint))
    })

    const resizedBytes = ks.map((pair, i, arr) => {
      // Check for padding characters in the middle.
      if (pair.r !== 0 && i !== arr.length - 1) {
        throw new Error('Padding character found before end of input at position ' + String(i))
      }
      const numBits = MAGIC_NUMBER_A - MAGIC_NUMBER_B * pair.r // 11 or 3
      return {
        byte: pair.k,
        numBits: numBits
      }
    })

    const bits = sizedBytesToBits(resizedBytes)

    const sizedBytes = bitsToSizedBytes(bits, MAGIC_NUMBER_B)
      .filter((sizedByte, i, arr) => {
        if (sizedByte.numBits === MAGIC_NUMBER_B) {
          return true
        }

        if (i !== arr.length - 1) {
          throw new Error('Incomplete byte found midway through stream')
        }

        // Final padding byte! Requires special consideration!
        // Remember how we always pad with 1s?
        if (sizedByte.byte !== ((1 << sizedByte.numBits) - 1)) {
          throw new Error('Padding mismatch')
        }

        return false
      })

    const uint8s = sizedBytes.map(function (sizedByte) {
      return sizedByte.byte
    })

    const uint8Array = new Uint8Array(uint8s)

    const arrayBuffer = uint8Array.buffer

    return arrayBuffer
  }
}
